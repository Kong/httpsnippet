require "http/client"

response = HTTP::Client.post "http://mockbin.com/har", form: "foo=bar&hello=world"
puts response.body
