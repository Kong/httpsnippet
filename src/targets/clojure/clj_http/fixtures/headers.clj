(require '[clj-http.client :as client])

(client/get "http://mockbin.com/har" {:headers {:x-foo "Bar"
                                                :quoted-value "\"quoted\" 'string'"}
                                      :accept :json})