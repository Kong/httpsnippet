require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://httpbin.org/anything")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)
request["Content-Type"] = 'multipart/form-data'

response = http.request(request)
puts response.read_body