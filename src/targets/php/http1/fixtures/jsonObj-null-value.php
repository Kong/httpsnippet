<?php

$request = new HttpRequest();
$request->setUrl('https://httpbin.org/anything');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders([
  'content-type' => 'application/json'
]);

$request->setBody('{"foo":null}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}