<?php

$request = new HttpRequest();
$request->setUrl('https://httpbin.org/headers');
$request->setMethod(HTTP_METH_GET);

$request->setHeaders([
  'accept' => 'text/json',
  'x-foo' => 'Bar'
]);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
