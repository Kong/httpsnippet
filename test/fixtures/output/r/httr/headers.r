library(httr)

url <- "http://mockbin.com/har"

response <- VERB("GET", url, add_headers(accept = 'application/json', x_foo = 'Bar'), content_type("application/octet-stream"))

content(response, "text")
