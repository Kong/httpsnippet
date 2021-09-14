<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('PROPFIND', 'https://httpbin.org/anything');

echo $response->getBody();
