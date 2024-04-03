require "http/client"

response = HTTP::Client.get "https://mockbin.com/har"
puts response.body
