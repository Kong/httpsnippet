<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'http://mockbin.com/har', [
  'headers' => [
    'cookie' => 'foo=bar; bar=baz',
  ],
]);

echo $response->getBody();