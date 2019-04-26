<?php

$client = new http\Client;
$request = new http\Client\Request;

$request->setRequestUrl('http://mockbin.com/har');
$request->setRequestMethod('GET');
$request->setHeaders(array(
  'accept' => 'application/json',
  'x-foo' => 'Bar'
));

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();
