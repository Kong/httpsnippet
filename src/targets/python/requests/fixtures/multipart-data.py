import requests

url = "https://httpbin.org/anything"

files = { "foo": ("src/fixtures/files/hello.txt", open("src/fixtures/files/hello.txt", "rb"), "text/plain") }
payload = { "bar": "Bonjour le monde" }

response = requests.post(url, data=payload, files=files)

print(response.text)