<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'http://mockbin.com/har', [
  'body' => 'Hello World',
  'headers' => [
    'content-type' => 'text/plain',
  ],
]);

echo $response->getBody();