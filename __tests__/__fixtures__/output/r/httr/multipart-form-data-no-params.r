library(httr)

url <- "https://httpbin.org/anything"

payload <- ""

response <- VERB("POST", url, body = payload, content_type("multipart/form-data"))

content(response, "text")
