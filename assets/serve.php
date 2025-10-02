<?php
$path = __DIR__ . '/' . basename($_GET['f']);
if (file_exists($path)) {
  header('Content-Type: image/png');
  readfile($path);
  exit;
}
http_response_code(404);
