import requests

url = "https://httpbin.org/anything"

payload = "Hello World"
headers = {"content-type": "text/plain"}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
