package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value"

	payload := strings.NewReader("foo=bar")

	req, err := http.NewRequest("POST", url, payload)

	if err != nil {
		panic(err)
	}
	req.Header.Add("cookie", "foo=bar; bar=baz")
	req.Header.Add("accept", "application/json")
	req.Header.Add("content-type", "application/x-www-form-urlencoded")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		panic(err)
	}

	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		panic(err)
	}

	fmt.Println(res)
	fmt.Println(string(body))

}