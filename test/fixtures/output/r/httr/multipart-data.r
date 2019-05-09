library(httr)

url <- "http://mockbin.com/har"

payload <- "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"; filename=\"hello.txt\"\r\nContent-Type: text/plain\r\n\r\nHello World\r\n-----011000010111000001101001--\r\n"

encode <- "multipart"

response <- VERB("POST", url, body = payload, add_headers(content_type = 'multipart/form-data; boundary=---011000010111000001101001'), encode = encode)

content(response, "text")
