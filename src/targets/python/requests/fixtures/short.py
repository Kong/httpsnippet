import requests

url = "http://mockbin.com/har"

response = requests.get(url)

print(response.json())