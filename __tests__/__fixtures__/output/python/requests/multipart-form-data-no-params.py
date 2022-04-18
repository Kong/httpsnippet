import requests

url = "https://httpbin.org/anything"

headers = {"Content-Type": "multipart/form-data"}

response = requests.request("POST", url, headers=headers)

print(response.text)
