import requests

url = "https://httpbin.org/anything"

querystring = {"foo[bar]":"baz,zap","fiz":"buz","key":"value"}

response = requests.request("GET", url, params=querystring)

print(response.text)
