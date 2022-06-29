import requests

url = "http://mockbin.com/har"

headers = {"Content-Type": "multipart/form-data"}

response = requests.request("POST", url, headers=headers)

print(response.text)