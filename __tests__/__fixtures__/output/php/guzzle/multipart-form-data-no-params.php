<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://httpbin.org/anything', [
  'headers' => [
    'Content-Type' => 'multipart/form-data',
  ],
]);

echo $response->getBody();
