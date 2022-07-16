CURL *hnd = curl_easy_init();

curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "GET");
curl_easy_setopt(hnd, CURLOPT_URL, "https://httpbin.org/cookies");

curl_easy_setopt(hnd, CURLOPT_COOKIE, "foo=bar; bar=baz");

CURLcode ret = curl_easy_perform(hnd);