import requests

url = "http://mockbin.com/har"

querystring = {"foo":["bar","baz"],"baz":"abc","key":"value"}

response = requests.get(url, params=querystring)

print(response.json())