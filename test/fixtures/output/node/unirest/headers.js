var unirest = require("unirest");

unirest.get("http://mockbin.com/har")
  .headers({"Accept":"application/json","X-Foo":"Bar"})
  .end(function(response){
    if (response.error) throw new Error(response.error);

    console.log(reponse.body);
  });

