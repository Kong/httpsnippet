import requests

url = "https://httpbin.org/headers"

headers = {
    "accept": "text/json",
    "x-foo": "Bar"
}

response = requests.request("GET", url, headers=headers)

print(response.text)
