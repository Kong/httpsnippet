require "http/client"

response = HTTP::Client.post(
  url: "http://mockbin.com/har",
  headers: HTTP::Headers{"content-type" => "application/json"},
  body: "{\"foo\":null}"
)
puts response.body
