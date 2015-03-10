package main

import (
	"fmt"
	"strings"
	"net/http"
)

func main() {
	client := &http.Client{}
	url := "http://mockbin.com/har?baz=abc&foo=bar&foo=baz"
	body := "foo=bar"
	req, _ := http.NewRequest("POST", url, strings.NewReader(body))
	req.Header.Add("Accept", "application/json")
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("Cookie", "foo=bar; bar=baz")
	res, _ := client.Do(req)
	fmt.Printf("%+v", res)
}
