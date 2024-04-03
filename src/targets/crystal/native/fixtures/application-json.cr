require "http/client"

response = HTTP::Client.post(
  url: "http://mockbin.com/har",
  headers: HTTP::Headers{"content-type" => "application/json"},
  body: "{\"number\":1,\"string\":\"f\\\"oo\",\"arr\":[1,2,3],\"nested\":{\"a\":\"b\"},\"arr_mix\":[1,\"a\",{\"arr_mix_nested\":{}}],\"boolean\":false}"
)
puts response.body
