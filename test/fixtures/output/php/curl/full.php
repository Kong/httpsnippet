<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://mockbin.com/har?baz=abc&foo=bar&foo=baz",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_COOKIE => "foo=bar; bar=baz",
  CURLOPT_HTTPHEADER => array(
    "Accept: application/json",
    "Content-Type: application/x-www-form-urlencoded"
  ),
));

$response = curl_exec($curl);

curl_close($curl);
