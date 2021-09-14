<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://httpbin.org/anything', [
  'body' => '{
  "foo": "bar"
}',
  'headers' => [
    'content-type' => 'application/json',
  ],
]);

echo $response->getBody();
