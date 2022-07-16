<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value');

echo $response->getBody();