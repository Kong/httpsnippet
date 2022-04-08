(require '[clj-http.client :as client])

(client/post "http://mockbin.com/har" {:form-params {:foo "bar"
                                                     :hello "world"}})