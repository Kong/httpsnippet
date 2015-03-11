var unirest = require("unirest");

unirest.get("http://mockbin.com/har")
  .query({"key":"value","baz":"abc","foo":["bar","baz"]})
  .end(function(response){
    if (response.error) throw new Error(response.error);

    console.log(reponse.body);
  });

