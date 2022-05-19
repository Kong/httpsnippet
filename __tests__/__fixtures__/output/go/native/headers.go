package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://httpbin.org/headers"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("accept", "text/json")
	req.Header.Add("x-foo", "Bar")
	req.Header.Add("x-bar", "Foo")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
