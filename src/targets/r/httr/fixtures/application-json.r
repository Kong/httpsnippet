library(httr)

url <- "http://mockbin.com/har"

payload <- "{\"number\":1,\"string\":\"f\\\"oo\",\"arr\":[1,2,3],\"nested\":{\"a\":\"b\"},\"arr_mix\":[1,\"a\",{\"arr_mix_nested\":{}}],\"boolean\":false}"

encode <- "json"

response <- VERB("POST", url, body = payload, content_type("application/json"), encode = encode)

content(response, "text")