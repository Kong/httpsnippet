require "http/client"

response = HTTP::Client.get "http://mockbin.com/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value"
puts response.body
