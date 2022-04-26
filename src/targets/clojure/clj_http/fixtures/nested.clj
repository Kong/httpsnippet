(require '[clj-http.client :as client])

(client/get "http://mockbin.com/har" {:query-params {:foo[bar] "baz,zap"
                                                     :fiz "buz"
                                                     :key "value"}})