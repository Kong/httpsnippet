import requests

url = "http://httpbin.org/anything"

response = requests.request("GET", url)

print(response.text)
