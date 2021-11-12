HTTPoison.request(
  :post,
  "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value",
  "foo=bar",
  [{"accept", "application/json"}, {"content-type", "application/x-www-form-urlencoded"}],
  hackney: [cookie: "foo=bar; bar=baz"]
)
