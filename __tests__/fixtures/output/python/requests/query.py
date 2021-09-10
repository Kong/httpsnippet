import requests

url = "https://httpbin.org/anything"

querystring = {"foo":["bar","baz"],"baz":"abc","key":"value"}

response = requests.request("GET", url, params=querystring)

print(response.text)
