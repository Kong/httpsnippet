library(httr)

url <- "http://mockbin.com/har"

queryString <- list(
  foo[bar] = "baz,zap",
  fiz = "buz"
)

response <- VERB("GET", url, query = queryString, content_type("application/octet-stream"))

content(response, "text")