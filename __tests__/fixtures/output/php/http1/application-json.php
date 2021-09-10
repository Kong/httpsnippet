<?php

$request = new HttpRequest();
$request->setUrl('https://httpbin.org/anything');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders([
  'content-type' => 'application/json'
]);

$request->setBody('{"number":1,"string":"f\\"oo","arr":[1,2,3],"nested":{"a":"b"},"arr_mix":[1,"a",{"arr_mix_nested":{}}],"boolean":false}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
