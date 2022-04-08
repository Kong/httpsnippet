$headers=@{}
$headers.Add("accept", "application/json")
$headers.Add("x-foo", "Bar")
$response = Invoke-RestMethod -Uri 'http://mockbin.com/har' -Method GET -Headers $headers
