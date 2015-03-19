import http.client

conn = http.client.HTTPSConnection("mockbin.com")

conn.request("GET", "/har")

res = conn.getresponse()
data = res.read()

print(res.status)
print(data)
