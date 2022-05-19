$headers=@{}
$headers.Add("accept", "text/json")
$headers.Add("x-foo", "Bar")
$headers.Add("x-bar", "Foo")
$response = Invoke-RestMethod -Uri 'https://httpbin.org/headers' -Method GET -Headers $headers
