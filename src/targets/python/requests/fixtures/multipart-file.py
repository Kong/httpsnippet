import requests

url = "https://httpbin.org/anything"

files = {"foo": open("src/fixtures/files/hello.txt", "rb")}

response = requests.post(url, files=files)

print(response.text)