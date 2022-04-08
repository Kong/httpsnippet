<?php

$client = new http\Client;
$request = new http\Client\Request;

$body = new http\Message\Body;
$body->append(new http\QueryString([
  'foo' => 'bar'
]));

$request->setRequestUrl('http://mockbin.com/har');
$request->setRequestMethod('POST');
$request->setBody($body);

$request->setQuery(new http\QueryString([
  'foo' => [
    'bar',
    'baz'
  ],
  'baz' => 'abc',
  'key' => 'value'
]));

$request->setHeaders([
  'accept' => 'application/json',
  'content-type' => 'application/x-www-form-urlencoded'
]);


$client->setCookies([
  'bar' => 'baz',
  'foo' => 'bar'
]);

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();