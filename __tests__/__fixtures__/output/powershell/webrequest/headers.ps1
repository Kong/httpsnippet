$headers=@{}
$headers.Add("accept", "text/json")
$headers.Add("x-foo", "Bar")
$response = Invoke-WebRequest -Uri 'https://httpbin.org/headers' -Method GET -Headers $headers
