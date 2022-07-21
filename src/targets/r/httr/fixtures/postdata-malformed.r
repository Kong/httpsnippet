library(httr)

url <- "https://httpbin.org/anything"

response <- VERB("POST", url, content_type("undefined"))

content(response, "text")