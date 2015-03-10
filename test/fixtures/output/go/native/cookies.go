package main

import (
	"fmt"
	"net/http"
)

func main() {
	client := &http.Client{}
	req, _ := http.NewRequest("POST", "http://mockbin.com/har", nil)
	req.Header.Add("Cookie", "foo=bar; bar=baz")
	res, _ := client.Do(req)
	fmt.Printf("%+v", res)
}
