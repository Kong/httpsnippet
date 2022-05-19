library(httr)

url <- "https://httpbin.org/headers"

response <- VERB("GET", url, add_headers('x-foo' = 'Bar', 'x-bar' = 'Foo'), content_type("application/octet-stream"), accept("text/json"))

content(response, "text")
