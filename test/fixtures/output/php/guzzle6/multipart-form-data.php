<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'http://mockbin.com/har', [
    'multipart' => array(
        array(
            'foo' => 'bar',
        ),
    ),
]);

echo $response->getBody();
