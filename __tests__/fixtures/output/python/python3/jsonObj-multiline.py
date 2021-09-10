import http.client

conn = http.client.HTTPSConnection("httpbin.org")

payload = "{\n  \"foo\": \"bar\"\n}"

headers = { 'content-type': "application/json" }

conn.request("POST", "/anything", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
