import requests

url = "https://httpbin.org/anything"

files = {"foo": ("src/fixtures/files/hello.txt", open("src/fixtures/files/hello.txt", "rb"), "text/plain")}

response = requests.post(url, files=files)

print(response.text)