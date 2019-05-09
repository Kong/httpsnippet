library(httr)

url <- "https://mockbin.com/har"

response <- VERB("GET", url)

content(response, "text")
