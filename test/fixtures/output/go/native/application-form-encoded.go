package main

import (
	"fmt"
	"strings"
	"net/http"
)

func main() {
	client := &http.Client{}
	url := "http://mockbin.com/har"
	body := "foo=bar&hello=world"
	req, _ := http.NewRequest("POST", url, strings.NewReader(body))
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	res, _ := client.Do(req)
	fmt.Printf("%+v", res)
}
