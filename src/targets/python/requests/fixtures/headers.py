import requests

url = "https://httpbin.org/headers"

headers = {
    "accept": "application/json",
    "x-foo": "Bar",
    "x-bar": "Foo",
    "quoted-value": "\"quoted\" 'string'"
}

response = requests.get(url, headers=headers)

print(response.json())