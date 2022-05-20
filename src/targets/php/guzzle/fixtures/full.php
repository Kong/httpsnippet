<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value', [
  'form_params' => [
    'foo' => 'bar'
  ],
  'headers' => [
    'accept' => 'application/json',
    'content-type' => 'application/x-www-form-urlencoded',
    'cookie' => 'foo=bar; bar=baz',
  ],
]);

echo $response->getBody();