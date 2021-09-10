<?php

$request = new HttpRequest();
$request->setUrl('https://httpbin.org/cookies');
$request->setMethod(HTTP_METH_GET);

$request->setCookies([
  'bar' => 'baz',
  'foo' => 'bar'
]);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
