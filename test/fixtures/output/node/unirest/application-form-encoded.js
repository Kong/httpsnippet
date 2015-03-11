var unirest = require("unirest");

unirest.post("http://mockbin.com/har")
  .type("application/x-www-form-urlencoded")
  .end(function(response){
    if (response.error) throw new Error(response.error);

    console.log(response.body);
  });

