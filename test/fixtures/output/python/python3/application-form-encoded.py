import http.client

conn = http.client.HTTPSConnection("httpbin.org")

payload = "foo=bar&hello=world"

headers = { 'content-type': "application/x-www-form-urlencoded" }

conn.request("POST", "/anything", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
