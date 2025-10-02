<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$parolePath = __DIR__ . '/parole.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($parolePath)) {
        $json = file_get_contents($parolePath);
        echo $json;
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'File non trovato']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Metodo non consentito']);
}
