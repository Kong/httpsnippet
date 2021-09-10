import http.client

conn = http.client.HTTPConnection("httpbin.org")

conn.request("GET", "/anything")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
