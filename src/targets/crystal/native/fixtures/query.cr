require "http/client"

response = HTTP::Client.get "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value"
puts response.body
