var unirest = require("unirest");

unirest.post("http://mockbin.com/har")
  .type("application/json")
  .end(function(response){
    if (response.error) throw new Error(response.error);

    console.log(response.body);
  });

