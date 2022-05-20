<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'http://mockbin.com/har', [
  'body' => '{"foo":null}',
  'headers' => [
    'content-type' => 'application/json',
  ],
]);

echo $response->getBody();