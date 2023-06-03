require 'faraday'

conn = Faraday.new(
  url: 'http://mockbin.com',
  headers: {'Content-Type' => 'text/plain'}
)

response = conn.post('/har') do |req|
  req.body = "Hello World"
end

puts response.status
puts response.body