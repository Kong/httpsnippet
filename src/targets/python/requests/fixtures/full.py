import requests

url = "https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value"

payload = { "foo": "bar" }
headers = {
    "cookie": "foo=bar; bar=baz",
    "accept": "application/json",
    "content-type": "application/x-www-form-urlencoded"
}

response = requests.post(url, data=payload, headers=headers)

print(response.json())