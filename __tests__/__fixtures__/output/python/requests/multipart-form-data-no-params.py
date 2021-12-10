import requests

url = "https://httpbin.org/anything"

payload = ""
headers = {"Content-Type": "multipart/form-data"}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
