<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$coloriPath = __DIR__ . '/colori.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($coloriPath)) {
        $json = file_get_contents($coloriPath);
        echo $json;
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'File non trovato']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Metodo non consentito']);
}
