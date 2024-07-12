require "http/client"

url = "http://mockbin.com/har"
headers = HTTP::Headers{
  "cookie" => "foo=bar; bar=baz"
}

response = HTTP::Client.post url, headers: headers
puts response.body