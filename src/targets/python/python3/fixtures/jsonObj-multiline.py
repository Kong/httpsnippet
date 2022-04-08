import http.client

conn = http.client.HTTPConnection("mockbin.com")

payload = "{\n  \"foo\": \"bar\"\n}"

headers = { 'content-type': "application/json" }

conn.request("POST", "/har", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))