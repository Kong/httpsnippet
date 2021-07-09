import requests

url = "http://mockbin.com/har"

querystring = {
    "foo[bar]": "baz,zap",
    "fiz": "buz",
    "key": "value"
}

response = requests.request("GET", url, params=querystring)

print(response.text)
