<?php

$request = new HttpRequest();
$request->setUrl('http://mockbin.com/har');
$request->setMethod(HTTP_METH_POST);

$request->setQueryData([
  'foo' => [
    'bar',
    'baz'
  ],
  'baz' => 'abc',
  'key' => 'value'
]);

$request->setHeaders([
  'accept' => 'application/json',
  'content-type' => 'application/x-www-form-urlencoded'
]);

$request->setCookies([
  'bar' => 'baz',
  'foo' => 'bar'
]);

$request->setContentType('application/x-www-form-urlencoded');
$request->setPostFields([
  'foo' => 'bar'
]);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}