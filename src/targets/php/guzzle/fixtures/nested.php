<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'http://mockbin.com/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value');

echo $response->getBody();