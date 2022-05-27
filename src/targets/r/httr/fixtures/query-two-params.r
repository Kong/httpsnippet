library(httr)

url <- "http://mockbin.com/har"

queryString <- list(
  perPage = "100",
  page = "1"
)

response <- VERB("GET", url, query = queryString, content_type("application/octet-stream"))

content(response, "text")