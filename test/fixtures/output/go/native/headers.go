package main

import (
	"fmt"
	"net/http"
)

func main() {
	client := &http.Client{}
	url := "http://mockbin.com/har"
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("Accept", "application/json")
	req.Header.Add("X-Foo", "Bar")
	res, _ := client.Do(req)
	fmt.Printf("%+v", res)
}
