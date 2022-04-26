<?php

$client = new http\Client;
$request = new http\Client\Request;

$request->setRequestUrl('http://mockbin.com/har');
$request->setRequestMethod('POST');

$client->setCookies([
  'bar' => 'baz',
  'foo' => 'bar'
]);

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();