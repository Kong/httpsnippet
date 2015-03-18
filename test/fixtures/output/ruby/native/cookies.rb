require 'uri'
require 'net/http'

url = URI("http://mockbin.com/har")

conn = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Post.new(url)
request["cookie"] = 'foo=bar; bar=baz'

response = conn.request(request)
puts response.read_body
