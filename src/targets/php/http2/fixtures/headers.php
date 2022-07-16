<?php

$client = new http\Client;
$request = new http\Client\Request;

$request->setRequestUrl('https://httpbin.org/headers');
$request->setRequestMethod('GET');
$request->setHeaders([
  'accept' => 'application/json',
  'x-foo' => 'Bar',
  'x-bar' => 'Foo'
]);

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();