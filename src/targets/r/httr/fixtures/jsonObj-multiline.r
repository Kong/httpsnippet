library(httr)

url <- "http://mockbin.com/har"

payload <- "{\n  \"foo\": \"bar\"\n}"

encode <- "json"

response <- VERB("POST", url, body = payload, content_type("application/json"), encode = encode)

content(response, "text")