library(httr)

url <- "https://httpbin.org/anything"

payload <- "Hello World"

encode <- "raw"

response <- VERB("POST", url, body = payload, content_type("text/plain"), encode = encode)

content(response, "text")
