$headers=@{}
$headers.Add("accept", "application/json")
$headers.Add("x-foo", "Bar")
$headers.Add("x-bar", "Foo")
$response = Invoke-WebRequest -Uri 'http://mockbin.com/har' -Method GET -Headers $headers
