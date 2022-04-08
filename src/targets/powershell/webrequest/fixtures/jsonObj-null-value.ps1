$headers=@{}
$headers.Add("content-type", "application/json")
$response = Invoke-WebRequest -Uri 'http://mockbin.com/har' -Method POST -Headers $headers -ContentType 'application/json' -Body '{"foo":null}'