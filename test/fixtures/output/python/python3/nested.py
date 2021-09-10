import http.client

conn = http.client.HTTPSConnection("httpbin.org")

conn.request("GET", "/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
