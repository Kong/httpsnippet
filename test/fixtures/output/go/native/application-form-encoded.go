package main

import (
	"fmt"
	"strings"
	"net/http"
)

func main() {
	client := &http.Client{}
	req, _ := http.NewRequest("POST", "http://mockbin.com/har", strings.NewReader("foo=bar&hello=world"))
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	res, _ := client.Do(req)
	fmt.Printf("%+v", res)
}
