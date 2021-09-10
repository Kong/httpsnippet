import http.client

conn = http.client.HTTPSConnection("httpbin.org")

payload = "Hello World"

headers = { 'content-type': "text/plain" }

conn.request("POST", "/anything", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
