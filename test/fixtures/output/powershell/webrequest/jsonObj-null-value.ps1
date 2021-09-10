$headers=@{}
$headers.Add("content-type", "application/json")
$response = Invoke-WebRequest -Uri 'https://httpbin.org/anything' -Method POST -Headers $headers -ContentType 'application/json' -Body '{"foo":null}'
