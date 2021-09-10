import requests

url = "https://httpbin.org/anything"

response = requests.request("GET", url)

print(response.text)
