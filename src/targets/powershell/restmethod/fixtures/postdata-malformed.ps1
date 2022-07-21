$headers=@{}
$headers.Add("content-type", "application/json")
$response = Invoke-RestMethod -Uri 'https://httpbin.org/anything' -Method POST -Headers $headers