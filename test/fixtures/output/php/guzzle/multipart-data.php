<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'http://mockbin.com/har', [
  'multipart' => [
    [
        'name' => 'foo',
        'filename' => 'hello.txt',
        'contents' => 'Hello World',
        'headers' => [
                'Content-Type' => 'text/plain'
        ]
    ]
  ]
]);

echo $response->getBody();
