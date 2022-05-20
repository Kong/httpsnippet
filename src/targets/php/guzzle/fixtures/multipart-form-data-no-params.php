<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'http://mockbin.com/har', [
  'headers' => [
    'Content-Type' => 'multipart/form-data',
  ],
]);

echo $response->getBody();