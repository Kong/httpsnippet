HTTPoison.request(
  :post,
  "http://mockbin.com/har",
  {:multipart, [{:file, "hello.txt", {"form-data", [{"name", "foo"}, {"filename", "hello.txt"}]}, [{"content-type", "multipart/form-data"}]}]},
  [{"content-type", "multipart/form-data"}]
)
