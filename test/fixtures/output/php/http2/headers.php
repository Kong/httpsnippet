<?php

$client = new http\Client;
$request = new http\Client\Request;

$request->setRequestUrl('https://httpbin.org/headers');
$request->setRequestMethod('GET');
$request->setHeaders([
  'accept' => 'text/json',
  'x-foo' => 'Bar'
]);

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();
