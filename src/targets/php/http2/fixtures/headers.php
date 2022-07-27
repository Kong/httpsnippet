<?php

$client = new http\Client;
$request = new http\Client\Request;

$request->setRequestUrl('http://mockbin.com/har');
$request->setRequestMethod('GET');
$request->setHeaders([
  'accept' => 'application/json',
  'x-foo' => 'Bar',
  'quoted-value' => '"quoted" \'string\''
]);

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();