import requests

url = "https://httpbin.org/anything"

response = requests.get(url)

print(response.text)
