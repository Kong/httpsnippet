<?php

$client = new http\Client;
$request = new http\Client\Request;

$request->setRequestUrl('http://mockbin.com/har');
$request->setRequestMethod('POST');
$request->setHeaders([
  'Content-Type' => 'multipart/form-data'
]);

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();