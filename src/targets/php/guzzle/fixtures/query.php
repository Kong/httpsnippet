<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value');

echo $response->getBody();