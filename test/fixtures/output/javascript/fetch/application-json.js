fetch("http://mockbin.com/har", {
  "method": "POST",
  "headers": {
    "content-type": "application/json"
  },
  "body": {
    "number": 1,
    "string": "f\"oo",
    "arr": [
      1,
      2,
      3
    ],
    "nested": {
      "a": "b"
    },
    "arr_mix": [
      1,
      "a",
      {
        "arr_mix_nested": {}
      }
    ],
    "boolean": false
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
