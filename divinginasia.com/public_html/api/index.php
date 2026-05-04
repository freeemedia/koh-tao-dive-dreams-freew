<?php
// PHP reverse proxy — forwards all requests to the Node backend on localhost:3001
// Deployed to: public_html/api/index.php

// Security: only forward to our own backend
define('BACKEND', 'http://127.0.0.1:3001');

// Build the upstream path.
// Frontend calls https://api.divinginasia.com/api/bookings so REQUEST_URI = /api/bookings
// Pass through as-is; Node backend already expects /api/* paths
$uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
$path = $uri;

$target = BACKEND . $path;

// Collect request method and body
$method  = $_SERVER['REQUEST_METHOD'];
$body    = file_get_contents('php://input');
$headers = [];

// Forward relevant request headers
$forwardHeaders = ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With'];
foreach ($forwardHeaders as $h) {
    $key = 'HTTP_' . strtoupper(str_replace('-', '_', $h));
    if (!empty($_SERVER[$key])) {
        $headers[] = $h . ': ' . $_SERVER[$key];
    }
}
// Content-Type comes via CONTENT_TYPE on some servers
if (empty($_SERVER['HTTP_CONTENT_TYPE']) && !empty($_SERVER['CONTENT_TYPE'])) {
    $headers[] = 'Content-Type: ' . $_SERVER['CONTENT_TYPE'];
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,            $target);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
curl_setopt($ch, CURLOPT_TIMEOUT,        30);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST,  $method);
curl_setopt($ch, CURLOPT_HTTPHEADER,     $headers);

if (in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE']) && $body !== '') {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
}

// Capture response headers
$responseHeaders = [];
curl_setopt($ch, CURLOPT_HEADERFUNCTION, function ($ch, $header) use (&$responseHeaders) {
    $responseHeaders[] = rtrim($header);
    return strlen($header);
});

$response  = curl_exec($ch);
$httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(502);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Backend unreachable', 'detail' => $curlError]);
    exit;
}

// Forward status code and safe response headers
http_response_code($httpCode);
$skipHeaders = ['transfer-encoding', 'connection', 'keep-alive', 'server', 'x-powered-by'];
foreach ($responseHeaders as $h) {
    if (strpos($h, ':') === false) continue;
    [$name] = explode(':', $h, 2);
    if (in_array(strtolower(trim($name)), $skipHeaders)) continue;
    header($h);
}

// CORS — allow the main domain to call this subdomain
header('Access-Control-Allow-Origin: https://divinginasia.com');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept');

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

echo $response;
