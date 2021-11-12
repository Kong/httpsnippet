HTTPoison.request(
  :post,
  "http://mockbin.com/har",
  {:multipart, [{:file, "test/fixtures/files/hello.txt", {"form-data", [{"name", "foo"}, {"filename", "test/fixtures/files/hello.txt"}]}, [{"content-type", "multipart/form-data"}]}]},
  [{"content-type", "multipart/form-data"}]
)
