require "http/client"

url = "http://mockbin.com/har"
headers = HTTP::Headers{
  "accept" => "application/json"
  "x-foo" => "Bar"
  "quoted-value" => "\"quoted\" 'string'"
}

response = HTTP::Client.get url, headers: headers
puts response.body