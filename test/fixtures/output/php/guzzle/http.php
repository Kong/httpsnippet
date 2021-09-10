<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'http://httpbin.org/anything');

echo $response->getBody();
