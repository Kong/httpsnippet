package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {
	client := &http.Client{}
	url := "http://mockbin.com/har?baz=abc&foo=bar&foo=baz"
	body := "foo=bar"
	req, _ := http.NewRequest("POST", url, strings.NewReader(body))
	req.Header.Add("Accept", "application/json")
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("Cookie", "foo=bar; bar=baz")
	res, _ := client.Do(req)
	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	fmt.Println(res)
	fmt.Println(string(body))
}
