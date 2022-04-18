import requests

url = "https://httpbin.org/anything"

files = {"foo": open("__tests__/__fixtures__/files/hello.txt", "rb")}

response = requests.request("POST", url, files=files)

print(response.text)
