import requests

url = "http://mockbin.com/har"

querystring = {"param":"value"}

response = requests.request("GET", url, params=querystring)

print(response.text)