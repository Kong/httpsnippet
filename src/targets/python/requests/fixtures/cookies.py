import requests

url = "http://mockbin.com/har"

headers = {"cookie": "foo=bar; bar=baz"}

response = requests.post(url, headers=headers)

print(response.json())