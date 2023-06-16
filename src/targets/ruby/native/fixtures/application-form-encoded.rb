require 'uri'
require 'net/http'

url = URI("https://httpbin.org/anything")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["content-type"] = 'application/x-www-form-urlencoded'
request.body = "foo=bar&hello=world"

response = http.request(request)
puts response.read_body