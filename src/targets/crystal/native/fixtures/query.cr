require "http/client"

url = "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value"

response = HTTP::Client.get url
puts response.body