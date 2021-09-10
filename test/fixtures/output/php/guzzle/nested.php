<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value');

echo $response->getBody();
