import requests

url = "https://httpbin.org/anything"

files = {"foo": open("__tests__/__fixtures__/files/hello.txt", "rb")}
payload = {"bar": "Bonjour le monde"}

response = requests.post(url, data=payload, files=files)

print(response.text)
