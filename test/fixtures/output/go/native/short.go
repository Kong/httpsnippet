package main

import (
	"fmt"
	"net/http"
)

func main() {
	client := &http.Client{}
	req, _ := http.NewRequest("GET", "http://mockbin.com/har", nil)
	res, _ := client.Do(req)
	fmt.Printf("%+v", res)
}
