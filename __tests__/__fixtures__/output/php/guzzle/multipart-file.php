<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://httpbin.org/anything', [
  'multipart' => [
    [
        'name' => 'foo',
        'filename' => '__tests__/__fixtures__/files/hello.txt',
        'contents' => null,
        'headers' => [
                'Content-Type' => 'text/plain'
        ]
    ]
  ]
]);

echo $response->getBody();
