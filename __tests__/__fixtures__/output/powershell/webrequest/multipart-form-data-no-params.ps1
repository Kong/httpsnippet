$headers=@{}
$headers.Add("Content-Type", "multipart/form-data")
$response = Invoke-WebRequest -Uri 'https://httpbin.org/anything' -Method POST -Headers $headers
