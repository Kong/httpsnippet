$headers=@{}
$headers.Add("content-type", "application/json")
$response = Invoke-RestMethod -Uri 'http://mockbin.com/har' -Method POST -Headers $headers -ContentType 'application/json' -Body '{"number":1,"string":"f\"oo","arr":[1,2,3],"nested":{"a":"b"},"arr_mix":[1,"a",{"arr_mix_nested":{}}],"boolean":false}'