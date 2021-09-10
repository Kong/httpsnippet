import http.client

conn = http.client.HTTPSConnection("httpbin.org")

conn.request("GET", "/anything")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
