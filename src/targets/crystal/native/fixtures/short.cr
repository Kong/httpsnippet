require "http/client"

url = "http://mockbin.com/har"

response = HTTP::Client.get url
puts response.body