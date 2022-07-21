<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://httpbin.org/anything', [
  'headers' => [
    'content-type' => 'application/json',
  ],
]);

echo $response->getBody();