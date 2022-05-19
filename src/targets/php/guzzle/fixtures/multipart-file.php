<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'http://mockbin.com/har', [
  'multipart' => [
    [
        'name' => 'foo',
        'filename' => 'test/fixtures/files/hello.txt',
        'contents' => null,
        'headers' => [
                'Content-Type' => 'text/plain'
        ]
    ]
  ]
]);

echo $response->getBody();