require "http/client"

url = "http://mockbin.com/har"

response = HTTP::Client.exec "PROPFIND", url
puts response.body