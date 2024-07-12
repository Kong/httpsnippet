require 'faraday'

conn = Faraday.new(
  url: 'http://mockbin.com',
)

response = conn.get('/har') do |req|
  req.headers['accept'] = 'application/json'
  req.headers['x-foo'] = 'Bar'
  req.headers['quoted-value'] = '"quoted" \'string\''
end

puts response.status
puts response.body