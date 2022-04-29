<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PROPFIND', 'http://mockbin.com/har');

echo $response->getBody();