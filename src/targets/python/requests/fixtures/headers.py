import requests

url = "http://mockbin.com/har"

headers = {
    "accept": "application/json",
    "x-foo": "Bar",
    "quoted-value": "\"quoted\" 'string'"
}

response = requests.get(url, headers=headers)

print(response.json())