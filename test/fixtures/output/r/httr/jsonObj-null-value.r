library(httr)

url <- "http://mockbin.com/har"

payload <- "{\"foo\":null}"

encode <- "json"

response <- VERB("POST", url, body = payload, add_headers(content_type = 'application/json'), encode = encode)

content(response, "text")
