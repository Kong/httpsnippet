require 'faraday'

conn = Faraday.new(
  url: 'http://mockbin.com',
)

response = conn.post('/har') do |req|
  req.headers['cookie'] = 'foo=bar; bar=baz'
end

puts response.status
puts response.body