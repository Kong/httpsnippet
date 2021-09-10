<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://httpbin.org/anything', [
  'body' => '{"foo":null}',
  'headers' => [
    'content-type' => 'application/json',
  ],
]);

echo $response->getBody();
