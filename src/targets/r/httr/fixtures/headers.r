library(httr)

url <- "https://httpbin.org/headers"

response <- VERB("GET", url, add_headers('x-foo' = 'Bar', 'x-bar' = 'Foo', 'quoted-value' = '"quoted" \'string\''), content_type("application/octet-stream"), accept("application/json"))

content(response, "text")