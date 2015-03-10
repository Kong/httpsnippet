package main

import (
	"fmt"
	"strings"
	"net/http"
)

func main() {
	client := &http.Client{}
	req, _ := http.NewRequest("POST", "http://mockbin.com/har?baz=abc&foo=bar&foo=baz", strings.NewReader("foo=bar"))
	req.Header.Add("Accept", "application/json")
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("Cookie", "foo=bar; bar=baz")
	res, _ := client.Do(req)
	fmt.Printf("%+v", res)
}
