import requests

url = "http://mockbin.com/har"

querystring = {'name':'foo','value':'bar','name':'foo','value':'baz','name':'baz','value':'abc'}

response = requests.request("GET", url, params=querystring)

print(response.text)
