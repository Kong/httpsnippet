require "http/client"

client = HTTP::Client.new "mockbin.com"
request = HTTP::Request.new "POST", resource: "/har"
request.cookies["foo"] = "bar"
request.cookies["bar"] = "baz"
response = client.exec request
puts response.body
