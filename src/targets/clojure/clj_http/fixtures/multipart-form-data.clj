(require '[clj-http.client :as client])

(client/post "http://mockbin.com/har" {:multipart [{:name "foo"
                                                    :content "bar"}]})