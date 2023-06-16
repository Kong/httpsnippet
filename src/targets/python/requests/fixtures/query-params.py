import requests

url = "https://httpbin.org/anything?param=value"

response = requests.get(url)

print(response.json())