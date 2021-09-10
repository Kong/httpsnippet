import requests

url = "https://httpbin.org/anything"

payload = {"foo": "bar"}
headers = {"content-type": "application/json"}

response = requests.request("POST", url, json=payload, headers=headers)

print(response.text)
