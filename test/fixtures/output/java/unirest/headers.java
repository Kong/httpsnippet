HttpResponse<JsonNode> jsonResponse = Unirest.get("http://mockbin.com/har")
			.header("Accept", "application/json")
			.header("X-Foo", "Bar")
			.asJson();
