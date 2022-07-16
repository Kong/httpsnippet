(require '[clj-http.client :as client])

(client/get "https://httpbin.org/anything" {:query-params {:foo[bar] "baz,zap"
                                                           :fiz "buz"
                                                           :key "value"}})