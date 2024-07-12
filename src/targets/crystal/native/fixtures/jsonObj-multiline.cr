require "http/client"

url = "http://mockbin.com/har"
headers = HTTP::Headers{
  "content-type" => "application/json"
}
reqBody = "{\n  \"foo\": \"bar\"\n}"

response = HTTP::Client.post url, headers: headers, body: reqBody
puts response.body