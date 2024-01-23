require 'faraday'

conn = Faraday.new(
  url: 'http://mockbin.com',
  headers: {'Content-Type' => 'application/json'}
)

response = conn.post('/har') do |req|
  req.body = "{\"number\":1,\"string\":\"f\\\"oo\",\"arr\":[1,2,3],\"nested\":{\"a\":\"b\"},\"arr_mix\":[1,\"a\",{\"arr_mix_nested\":{}}],\"boolean\":false}"
end

puts response.status
puts response.body