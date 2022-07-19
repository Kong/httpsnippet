import requests

url = "http://mockbin.com/har"

querystring = {"foo[bar]":"baz,zap","fiz":"buz","key":"value"}

response = requests.get(url, params=querystring)

print(response.json())