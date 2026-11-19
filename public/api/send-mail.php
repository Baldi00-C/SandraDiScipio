<?php
/**
 * POST /api/send-mail.php — invio del modulo contatti / preventivatore.
 *
 * Controlli, in ordine:
 *  1. CORS stretto + solo POST + dimensione massima
 *  2. token CSRF di sessione (hash_equals)
 *  3. honeypot e tempo minimo di compilazione (bot → finta conferma)
 *  4. rate limit per sessione e per IP
 *  5. validazione e sanitizzazione di ogni campo (filter_var, htmlspecialchars)
 *  6. invio con PHPMailer via SMTP autenticato (mai mail())
 */

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;

$privateDir = getenv('SDS_PRIVATE_DIR') ?: dirname(__DIR__, 2) . '/private';
require $privateDir . '/bootstrap.php';

sds_security_headers();
sds_cors(['POST']);

$config = sds_config();

// 1) Dimensione massima della richiesta (16 KB bastano e avanzano)
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 16384) {
    sds_json(413, ['ok' => false, 'message' => 'Richiesta troppo grande.']);
}

// 2) CSRF
$token = is_string($_POST['csrf_token'] ?? null) ? $_POST['csrf_token'] : '';
if (!sds_csrf_valid($token)) {
    sds_json(419, ['ok' => false, 'message' => 'La sessione è scaduta. Riprova a inviare il modulo.']);
}

// 3) Honeypot e tempo minimo: ai bot si risponde "ok" senza inviare nulla
$honeypot = is_string($_POST['website'] ?? null) ? trim($_POST['website']) : '';
$formTs   = filter_var($_POST['form_ts'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
$tooFast  = $formTs !== false && (time() - (int) $formTs) < (int) ($config['min_fill_seconds'] ?? 3);
if ($honeypot !== '' || $tooFast) {
    error_log('[sds] invio scartato (honeypot/tempo)');
    sds_json(200, ['ok' => true]);
}

// 4) Rate limit
if (sds_rate_limited()) {
    sds_json(429, ['ok' => false, 'message' => 'Hai inviato troppe richieste. Riprova più tardi o scrivici via email.']);
}

// 5) Validazione e sanitizzazione
$errors = [];

$name = sds_clean_line($_POST['name'] ?? '', 80);
if (mb_strlen($name) < 2) {
    $errors['name'] = 'inserisci il tuo nome.';
}

$emailRaw = sds_clean_line($_POST['email'] ?? '', 120);
$email    = filter_var($emailRaw, FILTER_VALIDATE_EMAIL);
if ($email === false || preg_match('/[\r\n,;]/', $emailRaw)) {
    $errors['email'] = 'inserisci un indirizzo email valido.';
    $email = '';
}

$phone = sds_clean_line($_POST['phone'] ?? '', 30);
if ($phone !== '' && !preg_match('/^[+0-9 ().\-]{6,30}$/', $phone)) {
    $errors['phone'] = 'inserisci un numero di telefono valido.';
}

$message = sds_clean_text($_POST['message'] ?? '', 2000);
if (mb_strlen($message) < 10) {
    $errors['message'] = 'scrivi almeno qualche parola sul tuo progetto.';
}

$privacy = ($_POST['privacy'] ?? '') === '1';
if (!$privacy) {
    $errors['privacy'] = 'serve il consenso al trattamento dei dati.';
}

$sources = ['contatti' => 'Pagina Contatti', 'home' => 'Home', 'preventivatore' => 'Preventivatore online'];
$sourceKey = is_string($_POST['source'] ?? null) && isset($sources[$_POST['source']]) ? $_POST['source'] : 'contatti';
$estimate  = $sourceKey === 'preventivatore' ? sds_clean_text($_POST['estimate'] ?? '', 2000) : '';

if ($errors !== []) {
    sds_json(422, ['ok' => false, 'message' => 'Controlla i campi evidenziati e riprova.', 'errors' => $errors]);
}

// 6) Composizione e invio
$autoload = SDS_PRIVATE_DIR . '/vendor/autoload.php';
if (!is_file($autoload)) {
    error_log('[sds] PHPMailer non installato: esegui "composer install"');
    sds_json(500, ['ok' => false, 'message' => 'Servizio momentaneamente non disponibile. Scrivici via email.']);
}
require $autoload;

$subject = 'Nuova richiesta dal sito · ' . $sources[$sourceKey] . ' · ' . $name;

$rows = [
    'Nome'      => $name,
    'Email'     => (string) $email,
    'Telefono'  => $phone !== '' ? $phone : '—',
    'Provenienza' => $sources[$sourceKey],
    'Data'      => date('d/m/Y H:i'),
];

$html  = '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1d1d1b">';
$html .= '<h2 style="font-family:Georgia,serif;font-weight:400">Nuova richiesta dal sito</h2><table cellpadding="6" style="border-collapse:collapse">';
foreach ($rows as $label => $value) {
    $html .= '<tr><td style="color:#6b5855">' . sds_e($label) . '</td><td>' . sds_e($value) . '</td></tr>';
}
$html .= '</table><h3 style="font-family:Georgia,serif;font-weight:400">Messaggio</h3><p>' . nl2br(sds_e($message)) . '</p>';
if ($estimate !== '') {
    $html .= '<h3 style="font-family:Georgia,serif;font-weight:400">Risposte al preventivatore</h3><p>' . nl2br(sds_e($estimate)) . '</p>';
}
$html .= '<p style="color:#6b5855;font-size:13px">Consenso privacy: sì. Rispondi direttamente a questa email per scrivere a ' . sds_e($name) . '.</p></div>';

$text = "Nuova richiesta dal sito\n\n";
foreach ($rows as $label => $value) {
    $text .= $label . ': ' . $value . "\n";
}
$text .= "\nMessaggio:\n" . $message . "\n";
if ($estimate !== '') {
    $text .= "\nRisposte al preventivatore:\n" . $estimate . "\n";
}

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = (string) $config['smtp_host'];
    $mail->Port       = (int) $config['smtp_port'];
    $mail->SMTPAuth   = true;
    $mail->Username   = (string) $config['smtp_username'];
    $mail->Password   = (string) $config['smtp_password'];
    $mail->SMTPSecure = ($config['smtp_secure'] ?? 'ssl') === 'tls' ? PHPMailer::ENCRYPTION_STARTTLS : PHPMailer::ENCRYPTION_SMTPS;
    $mail->Timeout    = 15;
    $mail->CharSet    = PHPMailer::CHARSET_UTF8;
    $mail->Encoding   = PHPMailer::ENCODING_BASE64;
    $mail->XMailer    = ' ';
    if (!empty($config['debug'])) {
        $mail->SMTPDebug   = 2;
        $mail->Debugoutput = static fn ($str) => error_log('[sds smtp] ' . trim((string) $str));
    }

    // Mittente fisso (dominio autenticato); il visitatore va solo in Reply-To
    $mail->setFrom((string) $config['mail_from'], sds_clean_line($config['mail_from_name'] ?? 'Sito web', 80), false);
    $mail->addAddress((string) $config['mail_to']);
    $mail->addReplyTo((string) $email, $name);

    $mail->isHTML(true);
    $mail->Subject = sds_clean_line($subject, 180);
    $mail->Body    = $html;
    $mail->AltBody = $text;

    $mail->send();
} catch (MailException $e) {
    error_log('[sds] errore invio: ' . $mail->ErrorInfo);
    sds_json(502, ['ok' => false, 'message' => 'Non siamo riusciti a inviare il messaggio. Riprova o scrivici via email.']);
}

sds_rate_record();
sds_csrf_issue(true); // token monouso: se ne genera uno nuovo
sds_json(200, ['ok' => true, 'message' => 'Grazie, richiesta inviata.']);
