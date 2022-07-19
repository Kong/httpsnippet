import requests

url = "http://mockbin.com/har"

files = { "foo": "open('hello.txt', 'rb')" }
payload = { "bar": "Bonjour le monde" }

response = requests.post(url, data=payload, files=files)

print(response.json())