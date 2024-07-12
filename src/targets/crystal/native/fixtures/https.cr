require "http/client"

url = "https://mockbin.com/har"

response = HTTP::Client.get url
puts response.body