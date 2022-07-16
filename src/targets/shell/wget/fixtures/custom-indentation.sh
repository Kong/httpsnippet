wget --quiet \
@--method POST \
@--header 'cookie: foo=bar; bar=baz' \
@--header 'accept: application/json' \
@--header 'content-type: application/x-www-form-urlencoded' \
@--body-data foo=bar \
@--output-document \
@- 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value'