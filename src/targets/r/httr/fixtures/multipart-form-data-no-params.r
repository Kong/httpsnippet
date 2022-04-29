library(httr)

url <- "http://mockbin.com/har"

payload <- ""

response <- VERB("POST", url, body = payload, content_type("multipart/form-data"))

content(response, "text")