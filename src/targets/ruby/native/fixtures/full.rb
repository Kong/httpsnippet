require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["cookie"] = 'foo=bar; bar=baz'
request["accept"] = 'application/json'
request["content-type"] = 'application/x-www-form-urlencoded'
request.body = "foo=bar"

response = http.request(request)
puts response.read_body