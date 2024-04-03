require "http/client"

response = HTTP::Client.post(
  url: "http://mockbin.com/har",
  headers: HTTP::Headers{"content-type" => "application/json"},
  body: "{\n  \"foo\": \"bar\"\n}"
)
puts response.body
