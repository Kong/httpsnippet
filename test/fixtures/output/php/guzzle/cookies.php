<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'http://mockbin.com/har', [
    'headers' => [
        CURLOPT_COOKIE => 'foo=bar; bar=baz',
    ],
]);

echo $response->getBody();
