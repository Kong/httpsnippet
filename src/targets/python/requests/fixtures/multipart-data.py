import requests

url = "https://httpbin.org/anything"

files = {"foo": open("src/fixtures/files/hello.txt", "rb")}
payload = {"bar": "Bonjour le monde"}

response = requests.post(url, data=payload, files=files)

print(response.text)