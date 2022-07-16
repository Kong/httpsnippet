<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://httpbin.org/anything', [
  'multipart' => [
    [
        'name' => 'foo',
        'contents' => 'bar'
    ]
  ]
]);

echo $response->getBody();