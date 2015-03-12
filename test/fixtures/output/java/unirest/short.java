//Import unirest libarary (http://unirest.io/java.html) 

HttpResponse<String> response = Unirest.get("http://mockbin.com/har")
  .asString();
