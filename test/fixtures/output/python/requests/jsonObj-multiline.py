import requests

url = "http://mockbin.com/har"

payload = "{\n  \"foo\": \"bar\"\n}"
headers = {'content-type': 'application/json'}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
