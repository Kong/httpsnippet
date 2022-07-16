<?php

$client = new http\Client;
$request = new http\Client\Request;

$request->setRequestUrl('https://httpbin.org/cookies');
$request->setRequestMethod('GET');

$client->setCookies([
  'bar' => 'baz',
  'foo' => 'bar'
]);

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();