const fetchOptions = {
  "mode": "cors",
  "method": "POST",
  "headers": {
    "content-type": "application/json"
  },
  "body": "{\"foo\":null}"
}

fetch("http://mockbin.com/har", fetchOptions)
  .then(response => response.json())
  .then(data => console.log(data));
