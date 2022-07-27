library(httr)

url <- "http://mockbin.com/har"

response <- VERB("GET", url, add_headers('x-foo' = 'Bar', 'quoted-value' = '"quoted" \'string\''), content_type("application/octet-stream"), accept("application/json"))

content(response, "text")