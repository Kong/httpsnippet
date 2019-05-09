library(httr)

url <- "http://mockbin.com/har"

payload <- "Hello World"

encode <- "raw"

response <- VERB("POST", url, body = payload, add_headers(content_type = 'text/plain'), encode = encode)

content(response, "text")
