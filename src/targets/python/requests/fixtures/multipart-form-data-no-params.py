import requests

url = "https://httpbin.org/anything"

headers = {"Content-Type": "multipart/form-data"}

response = requests.post(url, headers=headers)

print(response.json())