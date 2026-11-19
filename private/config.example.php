<?php
/**
 * CONFIGURAZIONE DEL MODULO CONTATTI — FILE DI ESEMPIO
 *
 * 1. Copia questo file in `private/config.php` (stessa cartella).
 * 2. Inserisci i dati reali. `config.php` è escluso da Git (.gitignore):
 *    non committarlo mai, la repository può essere pubblica.
 * 3. In produzione la cartella `private/` va caricata FUORI da public_html
 *    (vedi README → Deploy).
 *
 * Ogni valore può essere sovrascritto da una variabile d'ambiente con lo
 * stesso nome in maiuscolo (es. SMTP_PASSWORD).
 */

declare(strict_types=1);

return [
    // ── SMTP (es. Hostinger: smtp.hostinger.com, porta 465 + ssl) ──────────
    'smtp_host'     => 'smtp.example.com',
    'smtp_port'     => 465,
    'smtp_secure'   => 'ssl',            // 'ssl' (465) oppure 'tls' (587)
    'smtp_username' => 'info@example.com',
    'smtp_password' => 'CAMBIAMI',

    // ── Indirizzi ───────────────────────────────────────────────────────────
    'mail_from'      => 'info@example.com',          // deve coincidere col dominio SMTP
    'mail_from_name' => 'Sito Sandra Di Scipio',
    'mail_to'        => 'discipiosandra@gmail.com',  // chi riceve le richieste

    // ── Sicurezza ───────────────────────────────────────────────────────────
    // Origini ammesse (CORS). In produzione lascia SOLO il dominio reale.
    'allowed_origins' => [
        'https://www.sandradiscipio.it',
        'https://sandradiscipio.it',
        // sviluppo locale (rimuovi in produzione):
        'http://localhost:4321',
        'http://127.0.0.1:4321',
    ],

    // Chiave casuale per l'hash degli IP (genera con: php -r "echo bin2hex(random_bytes(32));")
    'app_key' => 'SOSTITUISCI-CON-64-CARATTERI-ESADECIMALI-CASUALI',

    // Limiti di invio
    'rate_limit_session_max'    => 3,    // invii per sessione …
    'rate_limit_session_window' => 600,  // … ogni 10 minuti
    'rate_limit_ip_hour'        => 5,    // invii per IP all'ora
    'rate_limit_ip_day'         => 20,   // invii per IP al giorno
    'min_fill_seconds'          => 3,    // sotto questa durata = bot

    // true solo in locale per vedere gli errori SMTP nel log PHP
    'debug' => false,
];
