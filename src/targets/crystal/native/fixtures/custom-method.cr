require "http/client"

response = HTTP::Client.exec "PROPFIND", "http://mockbin.com/har"
puts response.body
