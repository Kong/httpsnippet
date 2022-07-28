<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'http://mockbin.com/har', [
  'headers' => [
    'accept' => 'application/json',
    'quoted-value' => '"quoted" \'string\'',
    'x-foo' => 'Bar',
  ],
]);

echo $response->getBody();