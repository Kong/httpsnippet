package main

import (
	"fmt"
	"net/http"
)

func main() {
	client := &http.Client{}
	req, _ := http.NewRequest("GET", "http://mockbin.com/har?key=value&baz=abc&foo=bar&foo=baz", nil)
	res, _ := client.Do(req)
	fmt.Printf("%+v", res)
}
