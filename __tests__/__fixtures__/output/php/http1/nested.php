<?php

$request = new HttpRequest();
$request->setUrl('https://httpbin.org/anything');
$request->setMethod(HTTP_METH_GET);

$request->setQueryData([
  'foo[bar]' => 'baz,zap',
  'fiz' => 'buz',
  'key' => 'value'
]);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
