<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://httpbin.org/anything');

echo $response->getBody();
