import requests

url = "http://mockbin.com/har"

payload = "{\"foo\":null}"
headers = {'content-type': 'application/json'}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
