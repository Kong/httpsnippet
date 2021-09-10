library(httr)

url <- "https://httpbin.org/anything"

response <- VERB("GET", url, content_type("application/octet-stream"))

content(response, "text")
