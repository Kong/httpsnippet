package main

import (
	"fmt"
	"net/http"
)

func main() {
	client := &http.Client{}
	url := "http://mockbin.com/har"
	req, _ := http.NewRequest("POST", url, nil)
	req.Header.Add("Cookie", "foo=bar; bar=baz")
	res, _ := client.Do(req)
	fmt.Printf("%+v", res)
}
