package main

import (
	"fmt"
	"net/http"
)

func main() {
	client := &http.Client{}
	url := "http://mockbin.com/har?key=value&baz=abc&foo=bar&foo=baz"
	req, _ := http.NewRequest("GET", url, nil)
	res, _ := client.Do(req)
	fmt.Printf("%+v", res)
}
