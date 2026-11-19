<?php
/**
 * Bootstrap condiviso dagli endpoint /api/*.php.
 * Vive in private/ (fuori dalla document root): non è raggiungibile dal web.
 */

declare(strict_types=1);

ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

const SDS_PRIVATE_DIR = __DIR__;

/* ── Configurazione ──────────────────────────────────────────────────────── */

/** @return array<string,mixed> */
function sds_config(): array
{
    static $config = null;
    if ($config !== null) {
        return $config;
    }
    $file = SDS_PRIVATE_DIR . '/config.php';
    if (!is_file($file)) {
        error_log('[sds] private/config.php mancante: copia config.example.php');
        sds_json(500, ['ok' => false, 'message' => 'Servizio non configurato. Scrivici via email.']);
    }
    /** @var array<string,mixed> $loaded */
    $loaded = require $file;
    // Le variabili d'ambiente (es. SMTP_PASSWORD) hanno la precedenza
    foreach ($loaded as $key => $value) {
        $env = getenv(strtoupper($key));
        if ($env !== false && $env !== '' && !is_array($value)) {
            $loaded[$key] = is_int($value) ? (int) $env : (is_bool($value) ? filter_var($env, FILTER_VALIDATE_BOOL) : $env);
        }
    }
    $config = $loaded;
    return $config;
}

/* ── Risposte JSON e header di sicurezza ─────────────────────────────────── */

function sds_security_headers(): void
{
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, max-age=0');
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: same-origin');
    header("Content-Security-Policy: default-src 'none'; frame-ancestors 'none'");
    header_remove('X-Powered-By');
}

/** @param array<string,mixed> $data */
function sds_json(int $status, array $data): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/* ── CORS stretto sull'origine di produzione ─────────────────────────────── */

/**
 * Accetta solo richieste dalla stessa origine o da quelle elencate in
 * config['allowed_origins']. Gestisce il preflight OPTIONS.
 */
function sds_cors(array $allowedMethods): void
{
    $config  = sds_config();
    $allowed = array_map(static fn ($o) => rtrim((string) $o, '/'), (array) ($config['allowed_origins'] ?? []));
    $origin  = isset($_SERVER['HTTP_ORIGIN']) ? rtrim((string) $_SERVER['HTTP_ORIGIN'], '/') : '';

    if ($origin !== '') {
        if (!in_array($origin, $allowed, true)) {
            sds_json(403, ['ok' => false, 'message' => 'Origine non consentita.']);
        }
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Credentials: true');
        header('Vary: Origin');
    } else {
        // Nessun Origin: si accetta solo se il browser dichiara la stessa origine
        $site = $_SERVER['HTTP_SEC_FETCH_SITE'] ?? '';
        if ($site === 'cross-site') {
            sds_json(403, ['ok' => false, 'message' => 'Richiesta non consentita.']);
        }
    }

    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($method === 'OPTIONS') {
        header('Access-Control-Allow-Methods: ' . implode(', ', $allowedMethods) . ', OPTIONS');
        header('Access-Control-Allow-Headers: Accept, Content-Type, X-Requested-With');
        header('Access-Control-Max-Age: 600');
        http_response_code(204);
        exit;
    }
    if (!in_array($method, $allowedMethods, true)) {
        header('Allow: ' . implode(', ', $allowedMethods));
        sds_json(405, ['ok' => false, 'message' => 'Metodo non consentito.']);
    }
}

/* ── Sessione e token CSRF ───────────────────────────────────────────────── */

function sds_is_https(): bool
{
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https')
        || ((int) ($_SERVER['SERVER_PORT'] ?? 0) === 443);
}

function sds_session_start(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    session_name('SDSSESSID');
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'secure'   => sds_is_https(),
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();
}

const SDS_CSRF_TTL = 7200; // 2 ore

function sds_csrf_issue(bool $forceNew = false): string
{
    sds_session_start();
    $expired = ($_SESSION['csrf_time'] ?? 0) + SDS_CSRF_TTL < time();
    if ($forceNew || empty($_SESSION['csrf_token']) || $expired) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        $_SESSION['csrf_time']  = time();
    }
    return (string) $_SESSION['csrf_token'];
}

function sds_csrf_valid(string $token): bool
{
    sds_session_start();
    $stored = (string) ($_SESSION['csrf_token'] ?? '');
    $fresh  = ($_SESSION['csrf_time'] ?? 0) + SDS_CSRF_TTL >= time();
    return $stored !== '' && $fresh && strlen($token) === 64 && hash_equals($stored, $token);
}

/* ── Rate limiting (sessione + IP con hash) ──────────────────────────────── */

function sds_client_ip(): string
{
    // REMOTE_ADDR è l'unico valore non falsificabile dal client
    return (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
}

function sds_storage_dir(): string
{
    $dir = SDS_PRIVATE_DIR . '/storage/ratelimit';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    if (!is_dir($dir) || !is_writable($dir)) {
        $dir = rtrim(sys_get_temp_dir(), '/') . '/sds-ratelimit';
        if (!is_dir($dir)) {
            @mkdir($dir, 0700, true);
        }
    }
    return $dir;
}

/** Restituisce true se la richiesta supera i limiti. */
function sds_rate_limited(): bool
{
    $config = sds_config();
    $now    = time();

    // 1) Sessione
    sds_session_start();
    $window = (int) ($config['rate_limit_session_window'] ?? 600);
    $hits   = array_filter((array) ($_SESSION['sends'] ?? []), static fn ($t) => (int) $t > $now - $window);
    if (count($hits) >= (int) ($config['rate_limit_session_max'] ?? 3)) {
        return true;
    }

    // 2) IP (memorizzato solo come HMAC, cancellato dopo 24 h)
    $key  = hash_hmac('sha256', sds_client_ip(), (string) ($config['app_key'] ?? 'sds'));
    $file = sds_storage_dir() . '/' . $key . '.json';
    $list = [];
    if (is_file($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        $list    = is_array($decoded) ? array_filter($decoded, static fn ($t) => (int) $t > $now - 86400) : [];
    }
    $lastHour = array_filter($list, static fn ($t) => (int) $t > $now - 3600);
    if (count($lastHour) >= (int) ($config['rate_limit_ip_hour'] ?? 5)
        || count($list) >= (int) ($config['rate_limit_ip_day'] ?? 20)) {
        return true;
    }
    return false;
}

function sds_rate_record(): void
{
    $config = sds_config();
    $now    = time();
    $_SESSION['sends']   = array_values(array_filter((array) ($_SESSION['sends'] ?? []), static fn ($t) => (int) $t > $now - 86400));
    $_SESSION['sends'][] = $now;

    $dir  = sds_storage_dir();
    $key  = hash_hmac('sha256', sds_client_ip(), (string) ($config['app_key'] ?? 'sds'));
    $file = $dir . '/' . $key . '.json';
    $list = [];
    if (is_file($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        $list    = is_array($decoded) ? $decoded : [];
    }
    $list   = array_values(array_filter($list, static fn ($t) => (int) $t > $now - 86400));
    $list[] = $now;
    @file_put_contents($file, json_encode($list), LOCK_EX);

    // Pulizia occasionale dei file più vecchi di 24 h
    if (random_int(1, 20) === 1) {
        foreach ((array) glob($dir . '/*.json') as $old) {
            if (is_string($old) && filemtime($old) < $now - 86400) {
                @unlink($old);
            }
        }
    }
}

/* ── Sanitizzazione ──────────────────────────────────────────────────────── */

/** Testo su una riga: niente tag, niente CR/LF (anti header injection). */
function sds_clean_line(mixed $value, int $max): string
{
    $s = is_string($value) ? $value : '';
    $s = strip_tags($s);
    $s = preg_replace('/[\r\n\t\x00-\x1F\x7F]+/u', ' ', $s) ?? '';
    $s = trim(preg_replace('/\s{2,}/u', ' ', $s) ?? '');
    return mb_substr($s, 0, $max);
}

/** Testo multilinea: niente tag né caratteri di controllo, a capo normalizzati. */
function sds_clean_text(mixed $value, int $max): string
{
    $s = is_string($value) ? $value : '';
    $s = strip_tags($s);
    $s = str_replace(["\r\n", "\r"], "\n", $s);
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s) ?? '';
    $s = preg_replace("/\n{3,}/", "\n\n", $s) ?? '';
    return mb_substr(trim($s), 0, $max);
}

function sds_e(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5 | ENT_SUBSTITUTE, 'UTF-8');
}
