import http.client

conn = http.client.HTTPConnection("mockbin.com")

conn.request("GET", "/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))