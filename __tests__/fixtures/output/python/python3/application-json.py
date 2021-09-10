import http.client

conn = http.client.HTTPSConnection("httpbin.org")

payload = "{\"number\":1,\"string\":\"f\\\"oo\",\"arr\":[1,2,3],\"nested\":{\"a\":\"b\"},\"arr_mix\":[1,\"a\",{\"arr_mix_nested\":{}}],\"boolean\":false}"

headers = { 'content-type': "application/json" }

conn.request("POST", "/anything", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
