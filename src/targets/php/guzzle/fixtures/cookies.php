<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://httpbin.org/cookies', [
  'headers' => [
    'cookie' => 'foo=bar; bar=baz',
  ],
]);

echo $response->getBody();