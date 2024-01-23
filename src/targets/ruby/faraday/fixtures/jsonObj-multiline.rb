require 'faraday'

conn = Faraday.new(
  url: 'http://mockbin.com',
  headers: {'Content-Type' => 'application/json'}
)

response = conn.post('/har') do |req|
  req.body = "{\n  \"foo\": \"bar\"\n}"
end

puts response.status
puts response.body