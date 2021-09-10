require 'uri'
require 'net/http'
require 'openssl'

class Net::HTTP::Propfind < Net::HTTPRequest
  METHOD = 'PROPFIND'
  REQUEST_HAS_BODY = 'false'
  RESPONSE_HAS_BODY = true
end

url = URI("https://httpbin.org/anything")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Propfind.new(url)

response = http.request(request)
puts response.read_body
