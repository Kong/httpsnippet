package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	client := &http.Client{}

	url := "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value"

	req, _ := http.NewRequest("GET", url, nil)

	res, _ := client.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
