package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://httpbin.org/cookies"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("cookie", "foo=bar; bar=baz")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}