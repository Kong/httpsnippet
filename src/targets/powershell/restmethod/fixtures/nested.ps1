$response = Invoke-RestMethod -Uri 'http://mockbin.com/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value' -Method GET 
