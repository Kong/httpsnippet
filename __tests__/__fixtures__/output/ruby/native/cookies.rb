require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://httpbin.org/cookies")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["cookie"] = 'foo=bar; bar=baz'

response = http.request(request)
puts response.read_body
