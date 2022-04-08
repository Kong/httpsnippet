library(httr)

url <- "http://mockbin.com/har"

response <- VERB("PROPFIND", url, content_type("application/octet-stream"))

content(response, "text")