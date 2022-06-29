library(httr)

url <- "http://mockbin.com/har"

queryString <- list(
  foo = "bar,baz",
  baz = "abc"
)

payload <- "foo=bar"

encode <- "form"

response <- VERB("POST", url, body = payload, query = queryString, content_type("application/x-www-form-urlencoded"), accept("application/json"), set_cookies(`foo` = "bar", `bar` = "baz"), encode = encode)

content(response, "text")