<?php

$client = new http\Client;
$request = new http\Client\Request;

$body = new http\Message\Body;
$body->append('{"foo":null}');

$request->setRequestUrl('https://httpbin.org/anything');
$request->setRequestMethod('POST');
$request->setBody($body);

$request->setHeaders([
  'content-type' => 'application/json'
]);

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();