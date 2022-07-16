import requests

url = "https://httpbin.org/anything"

response = requests.request("PROPFIND", url)

print(response.text)