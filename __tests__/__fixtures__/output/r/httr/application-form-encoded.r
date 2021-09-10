library(httr)

url <- "https://httpbin.org/anything"

payload <- "foo=bar&hello=world"

encode <- "form"

response <- VERB("POST", url, body = payload, content_type("application/x-www-form-urlencoded"), encode = encode)

content(response, "text")
