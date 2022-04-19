import requests

url = "https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value"

response = requests.get(url)

print(response.text)
