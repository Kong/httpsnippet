<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://httpbin.org/headers', [
  'headers' => [
    'accept' => 'text/json',
    'x-foo' => 'Bar',
  ],
]);

echo $response->getBody();
