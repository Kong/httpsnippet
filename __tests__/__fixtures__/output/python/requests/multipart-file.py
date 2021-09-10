import requests

url = "https://httpbin.org/anything"

payload = "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"; filename=\"hello.txt\"\r\nContent-Type: text/plain\r\n\r\n\r\n-----011000010111000001101001--\r\n"
headers = {"content-type": "multipart/form-data; boundary=---011000010111000001101001"}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
