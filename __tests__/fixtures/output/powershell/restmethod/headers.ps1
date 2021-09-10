$headers=@{}
$headers.Add("accept", "text/json")
$headers.Add("x-foo", "Bar")
$response = Invoke-RestMethod -Uri 'https://httpbin.org/headers' -Method GET -Headers $headers
