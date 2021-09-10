$headers=@{}
$headers.Add("content-type", "text/plain")
$response = Invoke-RestMethod -Uri 'https://httpbin.org/anything' -Method POST -Headers $headers -ContentType 'text/plain' -Body 'Hello World'
