import http.client

conn = http.client.HTTPSConnection("httpbin.org")

payload = "{\"foo\":null}"

headers = { 'content-type': "application/json" }

conn.request("POST", "/anything", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
