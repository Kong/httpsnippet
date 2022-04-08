library(httr)

url <- "https://mockbin.com/har"

response <- VERB("GET", url, content_type("application/octet-stream"))

content(response, "text")