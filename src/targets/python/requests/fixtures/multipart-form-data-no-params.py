import requests

url = "http://mockbin.com/har"

headers = {"Content-Type": "multipart/form-data"}

response = requests.post(url, headers=headers)

print(response.json())