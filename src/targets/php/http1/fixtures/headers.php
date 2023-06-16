<?php

$request = new HttpRequest();
$request->setUrl('https://httpbin.org/headers');
$request->setMethod(HTTP_METH_GET);

$request->setHeaders([
  'accept' => 'application/json',
  'x-foo' => 'Bar',
  'x-bar' => 'Foo',
  'quoted-value' => '"quoted" \'string\''
]);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}