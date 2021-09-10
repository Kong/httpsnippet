<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://httpbin.org/anything', [
  'form_params' => [
    'foo' => 'bar',
    'hello' => 'world'
  ],
  'headers' => [
    'content-type' => 'application/x-www-form-urlencoded',
  ],
]);

echo $response->getBody();
