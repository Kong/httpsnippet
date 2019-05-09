library(httr)

url <- "http://mockbin.com/har"

payload <- "foo=bar&hello=world"

encode <- "form"

response <- VERB("POST", url, body = payload, add_headers(content_type = 'application/x-www-form-urlencoded'), encode = encode)

content(response, "text")
