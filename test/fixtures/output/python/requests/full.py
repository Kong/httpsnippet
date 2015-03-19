import requests

url = "http://mockbin.com/har"

querystring = {'name':'foo','value':'bar','name':'foo','value':'baz','name':'baz','value':'abc'}

payload = "foo=bar"
headers = {
    'cookie': "foo=bar; bar=baz",
    'accept': "application/json",
    'content-type': "application/x-www-form-urlencoded"
    }

response = requests.request("POST", url, data=payload, headers=headers, params=querystring)

print(response.text)
