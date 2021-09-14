import requests

url = "https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value"

response = requests.request("GET", url)

print(response.text)
