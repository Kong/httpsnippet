import requests

url = "https://httpbin.org/anything"

headers = {"content-type": "application/json"}

response = requests.post(url, headers=headers)

print(response.json())