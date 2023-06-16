import requests

url = "https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value"

response = requests.get(url)

print(response.json())