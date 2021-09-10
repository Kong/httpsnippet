import requests

url = "https://httpbin.org/cookies"

headers = {"cookie": "foo=bar; bar=baz"}

response = requests.request("GET", url, headers=headers)

print(response.text)
