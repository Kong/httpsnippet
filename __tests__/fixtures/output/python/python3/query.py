import http.client

conn = http.client.HTTPSConnection("httpbin.org")

conn.request("GET", "/anything?foo=bar&foo=baz&baz=abc&key=value")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
