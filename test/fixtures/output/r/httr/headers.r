library(httr)

url <- "https://httpbin.org/headers"

response <- VERB("GET", url, add_headers(x_foo = 'Bar'), content_type("application/octet-stream"), accept("text/json"))

content(response, "text")
