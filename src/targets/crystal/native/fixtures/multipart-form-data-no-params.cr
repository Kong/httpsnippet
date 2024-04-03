require "http/client"

response = HTTP::Client.post "http://mockbin.com/har", headers: HTTP::Headers{"Content-Type" => "multipart/form-data"}
puts response.body
