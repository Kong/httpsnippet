import requests

url = "https://httpbin.org/anything"

files = {"foo": open("__tests__/__fixtures__/files/hello.txt", "rb")}

response = requests.post(url, files=files)

print(response.text)
