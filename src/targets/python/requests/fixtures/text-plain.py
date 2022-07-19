import requests

url = "http://mockbin.com/har"

payload = "Hello World"
headers = {"content-type": "text/plain"}

response = requests.post(url, data=payload, headers=headers)

print(response.json())