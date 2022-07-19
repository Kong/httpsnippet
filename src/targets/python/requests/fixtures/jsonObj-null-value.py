import requests

url = "http://mockbin.com/har"

payload = { "foo": None }
headers = {"content-type": "application/json"}

response = requests.post(url, json=payload, headers=headers)

print(response.json())