(require '[clj-http.client :as client])

(client/post "http://mockbin.com/har" {:content-type :json
                                       :form-params {:foo nil}})