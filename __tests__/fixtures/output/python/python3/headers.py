import http.client

conn = http.client.HTTPSConnection("httpbin.org")

headers = {
    'accept': "text/json",
    'x-foo': "Bar"
    }

conn.request("GET", "/headers", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
