<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value', [
    'form_params' => array(
    'foo' => 'bar'
),
    'headers' => [
        'accept' => 'application/json',
        'content-type' => 'application/x-www-form-urlencoded',
        CURLOPT_COOKIE => 'foo=bar; bar=baz',
    ],
]);

echo $response->getBody();
