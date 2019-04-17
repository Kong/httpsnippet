$headers=@{}
$headers.Add("x-foo", "Bar")
$headers.Add("accept", "application/json")
$response = Invoke-RestMethod -Uri 'http://mockbin.com/har' -Method GET -Headers $headers
