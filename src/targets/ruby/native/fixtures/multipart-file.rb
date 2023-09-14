require 'uri'
require 'net/http'

url = URI("https://httpbin.org/anything")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["content-type"] = 'multipart/form-data; boundary=---011000010111000001101001'
request.body = "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"; filename=\"src/fixtures/files/hello.txt\"\r\nContent-Type: text/plain\r\n\r\n\r\n-----011000010111000001101001--"

response = http.request(request)
puts response.read_body