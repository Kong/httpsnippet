require 'uri'
require 'net/http'

url = URI("http://mockbin.com/har")

http = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Get.new(url)
request["accept"] = 'application/json'
request["x-foo"] = 'Bar'
request["x-bar"] = 'Foo'

response = http.request(request)
puts response.read_body