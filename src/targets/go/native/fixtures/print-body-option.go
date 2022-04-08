package main

import (
	"fmt"
	"strings"
	"net/http"
)

func main() {

	url := "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value"

	payload := strings.NewReader("foo=bar")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("cookie", "foo=bar; bar=baz")
	req.Header.Add("accept", "application/json")
	req.Header.Add("content-type", "application/x-www-form-urlencoded")

	res, _ := http.DefaultClient.Do(req)

	fmt.Println(res)

}