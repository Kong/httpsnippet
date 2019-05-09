library(httr)

url <- "http://mockbin.com/har"

queryString <- list(
  foo = "bar,baz",
  baz = "abc"
)

response <- VERB("GET", url, query = queryString)

content(response, "text")
