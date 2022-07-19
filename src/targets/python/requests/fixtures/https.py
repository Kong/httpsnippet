import requests

url = "https://mockbin.com/har"

response = requests.get(url)

print(response.json())