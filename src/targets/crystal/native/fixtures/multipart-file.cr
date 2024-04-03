require "http/client"

response = HTTP::Client.post(
  url: "http://mockbin.com/har",
  headers: HTTP::Headers{"content-type" => "multipart/form-data; boundary=---011000010111000001101001"},
  body: "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"; filename=\"hello.txt\"\r\nContent-Type: text/plain\r\n\r\n\r\n-----011000010111000001101001--\r\n"
)
puts response.body
