<?php

$request = new HttpRequest();
$request->setUrl('https://httpbin.org/anything');
$request->setMethod(HTTP_METH_GET);

$request->setQueryData([
  'startTime' => '2019-06-13T19%3A08%3A25.455Z',
  'endTime' => '2015-09-15T14%3A00%3A12-04%3A00'
]);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
