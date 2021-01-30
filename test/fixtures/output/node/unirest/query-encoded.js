const unirest = require("unirest");

const req = unirest("GET", "http://mockbin.com/har");

req.query({
  "startTime": "2019-06-13T19%3A08%3A25.455Z",
  "endTime": "2015-09-15T14%3A00%3A12-04%3A00"
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});

