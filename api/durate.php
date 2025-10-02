<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$duratePath = __DIR__ . '/durate.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($duratePath)) {
        $json = file_get_contents($duratePath);
        echo $json;
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'File non trovato']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Metodo non consentito']);
}
