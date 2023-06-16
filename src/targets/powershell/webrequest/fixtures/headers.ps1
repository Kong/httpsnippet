$headers=@{}
$headers.Add("accept", "application/json")
$headers.Add("x-foo", "Bar")
$headers.Add("x-bar", "Foo")
$headers.Add("quoted-value", "`"quoted`" 'string'")
$response = Invoke-WebRequest -Uri 'https://httpbin.org/headers' -Method GET -Headers $headers