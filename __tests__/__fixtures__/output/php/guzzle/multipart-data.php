<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://httpbin.org/anything', [
  'multipart' => [
    [
        'name' => 'foo',
        'filename' => '__tests__/__fixtures__/files/hello.txt',
        'contents' => 'Hello World',
        'headers' => [
                'Content-Type' => 'text/plain'
        ]
    ],
    [
        'name' => 'bar',
        'contents' => 'Bonjour le monde'
    ]
  ]
]);

echo $response->getBody();
