library(httr)

url <- "https://httpbin.org/cookies"

response <- VERB("GET", url, content_type("application/octet-stream"), set_cookies(`foo` = "bar", `bar` = "baz"))

content(response, "text")
