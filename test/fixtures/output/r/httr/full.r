library(httr)

url <- "http://mockbin.com/har"

queryString <- list(
  foo = "bar,baz",
  baz = "abc"
)

payload <- "foo=bar"

encode <- "form"

response <- VERB("POST", url, body = payload, add_headers(cookie = 'foo=bar; bar=baz', accept = 'application/json', content_type = 'application/x-www-form-urlencoded'), query = queryString, encode = encode)

content(response, "text")
