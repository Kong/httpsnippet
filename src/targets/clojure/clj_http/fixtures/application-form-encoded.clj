(require '[clj-http.client :as client])

(client/post "https://httpbin.org/anything" {:form-params {:foo "bar"
                                                           :hello "world"}})