require 'faraday'

conn = Faraday.new(
  url: 'http://mockbin.com',
)

response = conn.get('/har') do |req|
  req.params['foo'] = ["bar","baz"]
  req.params['baz'] = 'abc'
  req.params['key'] = 'value'
end

puts response.status
puts response.body