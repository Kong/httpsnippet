<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'http://mockbin.com/har', [
    'multipart' => [
        [
            'name' => 'foo',
            'type' => 'text/plain',
            'file' => 'test/fixtures/files/hello.txt',
            'data' => null,
        ],
    ],
]);

echo $response->getBody();
