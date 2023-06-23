import requests

url = "http://httpbin.org/anything"

response = requests.get(url)

print(response.text)