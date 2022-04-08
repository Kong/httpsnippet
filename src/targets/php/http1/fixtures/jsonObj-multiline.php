<?php

$request = new HttpRequest();
$request->setUrl('http://mockbin.com/har');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders([
  'content-type' => 'application/json'
]);

$request->setBody('{
  "foo": "bar"
}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}