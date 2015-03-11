var unirest = require("unirest");

unirest.get("http://mockbin.com/har")
  .end(function(response){
    if (response.error) throw new Error(response.error);

    console.log(reponse.body);
  });

