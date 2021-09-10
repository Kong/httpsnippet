<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://httpbin.org/anything', [
  'body' => 'Hello World',
  'headers' => [
    'content-type' => 'text/plain',
  ],
]);

echo $response->getBody();
