require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://httpbin.org/anything")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["content-type"] = 'text/plain'
request.body = "Hello World"

response = http.request(request)
puts response.read_body
