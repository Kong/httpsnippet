library(httr)

url <- "https://httpbin.org/anything"

queryString <- list(
  perPage = "100",
  page = "1"
)

response <- VERB("GET", url, query = queryString, content_type("application/octet-stream"))

content(response, "text")