import http.client

conn = http.client.HTTPConnection("mockbin.com")

payload = ""

headers = { 'Content-Type': "multipart/form-data" }

conn.request("POST", "/har", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))