require 'uri'
require 'net/http'

url = URI("http://mockbin.com/har")

http = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Post.new(url)
request["content-type"] = 'application/json'
request.body = "{\"foo\":null}"

response = http.request(request)
puts response.read_body