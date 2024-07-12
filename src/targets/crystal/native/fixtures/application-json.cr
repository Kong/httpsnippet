require "http/client"

url = "http://mockbin.com/har"
headers = HTTP::Headers{
  "content-type" => "application/json"
}
reqBody = "{\"number\":1,\"string\":\"f\\\"oo\",\"arr\":[1,2,3],\"nested\":{\"a\":\"b\"},\"arr_mix\":[1,\"a\",{\"arr_mix_nested\":{}}],\"boolean\":false}"

response = HTTP::Client.post url, headers: headers, body: reqBody
puts response.body