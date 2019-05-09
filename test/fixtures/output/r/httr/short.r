library(httr)

url <- "http://mockbin.com/har"

response <- VERB("GET", url)

content(response, "text")
