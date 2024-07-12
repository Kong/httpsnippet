require "http/client"

url = "http://mockbin.com/har"
headers = HTTP::Headers{
  "Content-Type" => "multipart/form-data; boundary=---011000010111000001101001"
}
reqBody = "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"\r\n\r\nbar\r\n-----011000010111000001101001--\r\n"

response = HTTP::Client.post url, headers: headers, body: reqBody
puts response.body