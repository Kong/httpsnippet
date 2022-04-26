import requests

url = "http://mockbin.com/har"

payload = {"foo": "bar"}
headers = {"content-type": "application/json"}

response = requests.request("POST", url, json=payload, headers=headers)

print(response.text)