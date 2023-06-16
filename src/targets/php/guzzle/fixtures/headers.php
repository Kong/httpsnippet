<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://httpbin.org/headers', [
  'headers' => [
    'accept' => 'application/json',
    'quoted-value' => '"quoted" \'string\'',
    'x-bar' => 'Foo',
    'x-foo' => 'Bar',
  ],
]);

echo $response->getBody();