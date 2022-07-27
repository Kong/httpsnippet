import http.client

conn = http.client.HTTPConnection("mockbin.com")

headers = {
    'accept': "application/json",
    'x-foo': "Bar",
    'quoted-value': "\"quoted\" 'string'"
    }

conn.request("GET", "/har", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))