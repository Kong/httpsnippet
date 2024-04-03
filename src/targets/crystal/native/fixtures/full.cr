require "http/client"

uri = "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value"
headers = HTTP::Headers{
  "cookie"       => "foo=bar; bar=baz",
  "accept"       => "application/json",
  "content-type" => "application/x-www-form-urlencoded",
}

response = HTTP::Client.post uri, headers: headers, body: "foo=bar"
puts response.body
