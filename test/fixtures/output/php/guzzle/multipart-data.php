<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'http://mockbin.com/har', [
    'multipart' => [
        [
            'name' => 'foo',
            'type' => 'text/plain',
            'file' => 'hello.txt',
            'data' => 'Hello World',
        ],
    ],
]);

echo $response->getBody();
