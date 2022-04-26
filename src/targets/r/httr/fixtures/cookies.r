library(httr)

url <- "http://mockbin.com/har"

response <- VERB("POST", url, content_type("application/octet-stream"), set_cookies(`foo` = "bar", `bar` = "baz"))

content(response, "text")