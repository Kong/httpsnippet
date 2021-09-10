<?php

$client = new http\Client;
$request = new http\Client\Request;

$request->setRequestUrl('https://httpbin.org/anything');
$request->setRequestMethod('GET');
$request->setQuery(new http\QueryString([
  'startTime' => '2019-06-13T19%3A08%3A25.455Z',
  'endTime' => '2015-09-15T14%3A00%3A12-04%3A00'
]));

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();
