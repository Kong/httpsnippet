library(httr)

url <- "https://httpbin.org/anything"

payload <- "{\n  \"foo\": \"bar\"\n}"

encode <- "json"

response <- VERB("POST", url, body = payload, content_type("application/json"), encode = encode)

content(response, "text")