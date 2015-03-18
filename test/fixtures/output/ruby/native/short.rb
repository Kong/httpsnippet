require 'uri'
require 'net/http'

url = URI("http://mockbin.com/har")

conn = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Get.new(url)

response = conn.request(request)
puts response.read_body
