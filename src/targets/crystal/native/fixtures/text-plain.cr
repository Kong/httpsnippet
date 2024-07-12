require "http/client"

url = "http://mockbin.com/har"
headers = HTTP::Headers{
  "content-type" => "text/plain"
}
reqBody = "Hello World"

response = HTTP::Client.post url, headers: headers, body: reqBody
puts response.body