<?php

$client = new http\Client;
$request = new http\Client\Request;

$body = new http\Message\Body;
$body->addForm([
  'bar' => 'Bonjour le monde'
], [
  [
    'name' => 'foo',
    'type' => 'text/plain',
    'file' => '__tests__/__fixtures__/files/hello.txt',
    'data' => 'Hello World'
  ]
]);

$request->setRequestUrl('https://httpbin.org/anything');
$request->setRequestMethod('POST');
$request->setBody($body);

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();