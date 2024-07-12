require "http/client"

url = "http://mockbin.com/har"
headers = HTTP::Headers{
  "Content-Type" => "multipart/form-data"
}

response = HTTP::Client.post url, headers: headers
puts response.body