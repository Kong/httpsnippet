import http.client

conn = http.client.HTTPSConnection("httpbin.org")

conn.request("GET", "/anything?startTime=2019-06-13T19%3A08%3A25.455Z&endTime=2015-09-15T14%3A00%3A12-04%3A00")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
