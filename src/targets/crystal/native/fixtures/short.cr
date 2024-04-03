require "http/client"

response = HTTP::Client.get "http://mockbin.com/har"
puts response.body
