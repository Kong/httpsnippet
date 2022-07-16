<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://httpbin.org/anything', [
  'multipart' => [
    [
        'name' => 'foo',
        'filename' => 'src/fixtures/files/hello.txt',
        'contents' => null,
        'headers' => [
                'Content-Type' => 'text/plain'
        ]
    ]
  ]
]);

echo $response->getBody();