$headers=@{}
$headers.Add("Content-Type", "multipart/form-data; boundary=---011000010111000001101001")
$response = Invoke-RestMethod -Uri 'https://httpbin.org/anything' -Method POST -Headers $headers -ContentType 'multipart/form-data; boundary=---011000010111000001101001' -Body '-----011000010111000001101001
Content-Disposition: form-data; name="foo"

bar
-----011000010111000001101001--
'