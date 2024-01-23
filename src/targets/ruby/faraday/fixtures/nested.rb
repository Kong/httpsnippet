require 'faraday'

conn = Faraday.new(
  url: 'http://mockbin.com',
)

response = conn.get('/har') do |req|
  req.params['foo[bar]'] = 'baz,zap'
  req.params['fiz'] = 'buz'
  req.params['key'] = 'value'
end

puts response.status
puts response.body