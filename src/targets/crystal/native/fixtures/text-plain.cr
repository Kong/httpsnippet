require "http/client"

response = HTTP::Client.post(
  url: "http://mockbin.com/har",
  headers: HTTP::Headers{"content-type" => "text/plain"},
  body: "Hello World"
)
puts response.body
