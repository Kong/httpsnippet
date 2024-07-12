require "http/client"

url = "http://mockbin.com/har"
headers = HTTP::Headers{
  "content-type" => "application/x-www-form-urlencoded"
}
reqBody = "foo=bar&hello=world"

response = HTTP::Client.post url, headers: headers, body: reqBody
puts response.body