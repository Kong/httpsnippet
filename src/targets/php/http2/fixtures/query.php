<?php

$client = new http\Client;
$request = new http\Client\Request;

$request->setRequestUrl('https://httpbin.org/anything');
$request->setRequestMethod('GET');
$request->setQuery(new http\QueryString([
  'foo' => [
    'bar',
    'baz'
  ],
  'baz' => 'abc',
  'key' => 'value'
]));

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();