<?php
/**
 * GET /api/csrf-token.php → { "token": "…" }
 * Richiamato dal form al primo focus. Il token è legato alla sessione PHP.
 */

declare(strict_types=1);

$privateDir = getenv('SDS_PRIVATE_DIR') ?: dirname(__DIR__, 2) . '/private';
require $privateDir . '/bootstrap.php';

sds_security_headers();
sds_cors(['GET']);

$token = sds_csrf_issue();
sds_json(200, ['token' => $token]);
