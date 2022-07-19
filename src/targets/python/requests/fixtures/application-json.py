import requests

url = "http://mockbin.com/har"

payload = {
    "number": 1,
    "string": "f\"oo",
    "arr": [1, 2, 3],
    "nested": { "a": "b" },
    "arr_mix": [1, "a", { "arr_mix_nested": {} }],
    "boolean": False
}
headers = {"content-type": "application/json"}

response = requests.post(url, json=payload, headers=headers)

print(response.json())