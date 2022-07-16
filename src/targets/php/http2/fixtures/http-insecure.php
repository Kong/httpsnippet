<?php

$client = new http\Client;
$request = new http\Client\Request;

$request->setRequestUrl('http://httpbin.org/anything');
$request->setRequestMethod('GET');
$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();