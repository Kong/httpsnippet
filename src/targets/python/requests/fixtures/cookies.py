import requests

url = "https://httpbin.org/cookies"

headers = {"cookie": "foo=bar; bar=baz"}

response = requests.get(url, headers=headers)

print(response.json())