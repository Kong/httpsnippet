library(httr)

url <- "http://mockbin.com/har"

response <- VERB("POST", url, add_headers(cookie = 'foo=bar; bar=baz'))

content(response, "text")
