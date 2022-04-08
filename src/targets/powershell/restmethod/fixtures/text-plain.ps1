$headers=@{}
$headers.Add("content-type", "text/plain")
$response = Invoke-RestMethod -Uri 'http://mockbin.com/har' -Method POST -Headers $headers -ContentType 'text/plain' -Body 'Hello World'