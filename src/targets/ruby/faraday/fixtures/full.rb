require 'faraday'

data = {
  :foo => "bar",
}

conn = Faraday.new(
  url: 'http://mockbin.com',
  headers: {'Content-Type' => 'application/x-www-form-urlencoded'}
)

response = conn.post('/har') do |req|
  req.headers['cookie'] = 'foo=bar; bar=baz'
  req.headers['accept'] = 'application/json'
  req.params['foo'] = ["bar","baz"]
  req.params['baz'] = 'abc'
  req.params['key'] = 'value'
  req.body = URI.encode_www_form(data)
end

puts response.status
puts response.body