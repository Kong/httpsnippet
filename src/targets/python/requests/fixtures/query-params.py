import requests

url = "http://mockbin.com/har"

querystring = {"param":"value"}

response = requests.get(url, params=querystring)

print(response.json())