library(httr)

url <- "http://mockbin.com/har"

response <- VERB("PROPFIND", url)

content(response, "text")
