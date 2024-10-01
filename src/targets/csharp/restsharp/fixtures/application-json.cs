var client = new RestClient("http://mockbin.com/har");
var request = new RestRequest("", Method.Post);
request.AddHeader("content-type", "application/json");
request.AddParameter("application/json", "{\"number\":1,\"string\":\"f\\\"oo\",\"arr\":[1,2,3],\"nested\":{\"a\":\"b\"},\"arr_mix\":[1,\"a\",{\"arr_mix_nested\":{}}],\"boolean\":false}", ParameterType.RequestBody);
var response = client.Execute(request);