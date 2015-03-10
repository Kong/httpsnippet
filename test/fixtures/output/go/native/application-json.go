package main

import (
	"fmt"
	"strings"
	"net/http"
)

func main() {
	client := &http.Client{}
	req, _ := http.NewRequest("POST", "http://mockbin.com/har", strings.NewReader("{\"foo\": \"bar\"}"))
	req.Header.Add("Content-Type", "application/json")
	res, _ := client.Do(req)
	fmt.Printf("%+v", res)
}
