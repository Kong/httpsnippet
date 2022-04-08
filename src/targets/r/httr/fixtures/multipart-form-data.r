library(httr)

url <- "http://mockbin.com/har"

payload <- "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"\r\n\r\nbar\r\n-----011000010111000001101001--\r\n"

encode <- "multipart"

response <- VERB("POST", url, body = payload, content_type("multipart/form-data"), encode = encode)

content(response, "text")