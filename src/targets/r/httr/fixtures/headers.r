library(httr)

url <- "http://mockbin.com/har"

response <- VERB("GET", url, add_headers(x_foo = 'Bar'), content_type("application/octet-stream"), accept("application/json"))

content(response, "text")
