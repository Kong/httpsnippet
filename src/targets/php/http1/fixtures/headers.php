<?php

$request = new HttpRequest();
$request->setUrl('http://mockbin.com/har');
$request->setMethod(HTTP_METH_GET);

$request->setHeaders([
  'accept' => 'application/json',
  'x-foo' => 'Bar',
  'quoted-value' => '"quoted" \'string\''
]);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}