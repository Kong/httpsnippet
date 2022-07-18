import http.client
import ssl

conn = http.client.HTTPSConnection("mockbin.com", context = ssl._create_unverified_context())

conn.request("GET", "/har")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))