<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://httpbin.org/anything', [
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
