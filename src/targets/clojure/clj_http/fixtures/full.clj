(require '[clj-http.client :as client])

(client/post "http://mockbin.com/har" {:headers {:cookie "foo=bar; bar=baz"}
                                       :query-params {:foo ["bar" "baz"]
                                                      :baz "abc"
                                                      :key "value"}
                                       :form-params {:foo "bar"}
                                       :accept :json})