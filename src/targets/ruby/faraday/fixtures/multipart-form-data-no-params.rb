require 'faraday'

conn = Faraday.new(
  url: 'http://mockbin.com',
  headers: {'Content-Type' => 'multipart/form-data'}
)

response = conn.post('/har') do |req|
end

puts response.status
puts response.body