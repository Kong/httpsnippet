require "http/client"

headers = HTTP::Headers{
  "accept"       => "application/json",
  "x-foo"        => "Bar",
  "quoted-value" => "\"quoted\" 'string'",
}

response = HTTP::Client.get "http://mockbin.com/har", headers: headers
puts response.body
