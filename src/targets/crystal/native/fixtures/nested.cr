require "http/client"

url = "http://mockbin.com/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value"

response = HTTP::Client.get url
puts response.body