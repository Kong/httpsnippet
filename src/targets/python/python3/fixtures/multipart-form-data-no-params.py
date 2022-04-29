import http.client

conn = http.client.HTTPSConnection("httpbin.org")

payload = ""

headers = { 'Content-Type': "multipart/form-data" }

conn.request("POST", "/anything", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))