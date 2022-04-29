<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://mockbin.com/har');

echo $response->getBody();