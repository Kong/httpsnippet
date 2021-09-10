(require '[clj-http.client :as client])

(client/post "https://httpbin.org/anything" {:multipart [{:name "foo"
                                                          :content (clojure.java.io/file "__tests__/__fixtures__/files/hello.txt")}]})
