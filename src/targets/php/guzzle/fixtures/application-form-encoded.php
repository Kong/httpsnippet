<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'http://mockbin.com/har', [
  'form_params' => [
    'foo' => 'bar',
    'hello' => 'world'
  ],
  'headers' => [
    'content-type' => 'application/x-www-form-urlencoded',
  ],
]);

echo $response->getBody();