$headers=@{}
$headers.Add("content-type", "multipart/form-data; boundary=---011000010111000001101001")
$response = Invoke-RestMethod -Uri 'http://mockbin.com/har' -Method POST -Headers $headers -ContentType 'multipart/form-data; boundary=---011000010111000001101001' -Body '-----011000010111000001101001
Content-Disposition: form-data; name="foo"; filename="hello.txt"
Content-Type: text/plain


-----011000010111000001101001--
'