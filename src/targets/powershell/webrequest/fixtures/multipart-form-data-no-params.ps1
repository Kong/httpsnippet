$headers=@{}
$headers.Add("Content-Type", "multipart/form-data")
$response = Invoke-WebRequest -Uri 'http://mockbin.com/har' -Method POST -Headers $headers