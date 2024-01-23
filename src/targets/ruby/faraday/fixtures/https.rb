require 'faraday'

conn = Faraday.new(
  url: 'https://mockbin.com',
)

response = conn.get('/har') do |req|
end

puts response.status
puts response.body