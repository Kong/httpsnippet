require 'uri'
require 'net/http'

url = URI("https://httpbin.org/anything")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["content-type"] = 'application/json'
request.body = "{\n  \"foo\": \"bar\"\n}"

response = http.request(request)
puts response.read_body