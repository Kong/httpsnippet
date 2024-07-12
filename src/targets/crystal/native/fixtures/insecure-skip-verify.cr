require "http/client"

url = "https://mockbin.com/har"

response = HTTP::Client.get url, tls: OpenSSL::SSL::Context::Client.insecure
puts response.body