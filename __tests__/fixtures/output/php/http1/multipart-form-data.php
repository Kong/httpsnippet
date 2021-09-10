<?php

$request = new HttpRequest();
$request->setUrl('https://httpbin.org/anything');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders([
  'Content-Type' => 'multipart/form-data; boundary=---011000010111000001101001'
]);

$request->setBody('-----011000010111000001101001
Content-Disposition: form-data; name="foo"

bar
-----011000010111000001101001--
');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
