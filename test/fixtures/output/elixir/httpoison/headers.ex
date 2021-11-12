HTTPoison.request(
  :get,
  "http://mockbin.com/har",
  "",
  [{"accept", "application/json"}, {"x-foo", "Bar"}]
)
