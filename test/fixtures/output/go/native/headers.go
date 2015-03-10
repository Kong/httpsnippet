package main

import (
	"fmt"
	"net/http"
)

func main() {
	client := &http.Client{}
	req, _ := http.NewRequest("GET", "http://mockbin.com/har", nil)
	req.Header.Add("Accept", "application/json")
	req.Header.Add("X-Foo", "Bar")
	res, _ := client.Do(req)
	fmt.Printf("%+v", res)
}
