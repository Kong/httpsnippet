import http.client

conn = http.client.HTTPSConnection("httpbin.org")

headers = { 'cookie': "foo=bar; bar=baz" }

conn.request("GET", "/cookies", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
