<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'http://mockbin.com/har', [
    'multipart' => [
        [
            'foo' => 'bar',
        ],
    ],
]);

echo $response->getBody();
