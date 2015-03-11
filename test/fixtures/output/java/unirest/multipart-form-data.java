HttpResponse<JsonNode> jsonResponse = Unirest.post("http://mockbin.com/har")
			.header("Content-Type", "multipart/form-data")
			.body("-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"\r\n\r\nbar\r\n-----011000010111000001101001--")
			.asJson();
