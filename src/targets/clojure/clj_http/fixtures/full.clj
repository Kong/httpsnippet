(require '[clj-http.client :as client])

(client/post "https://httpbin.org/anything" {:headers {:cookie "foo=bar; bar=baz"}
                                             :query-params {:foo ["bar" "baz"]
                                                            :baz "abc"
                                                            :key "value"}
                                             :form-params {:foo "bar"}
                                             :accept :json})