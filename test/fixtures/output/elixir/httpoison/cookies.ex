HTTPoison.request(
  :post,
  "http://mockbin.com/har",
  "",
  [],
  hackney: [cookie: "foo=bar; bar=baz"]
)
