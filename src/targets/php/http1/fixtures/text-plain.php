<?php

$request = new HttpRequest();
$request->setUrl('https://httpbin.org/anything');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders([
  'content-type' => 'text/plain'
]);

$request->setBody('Hello World');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}