package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "http://mockbin.com/har"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Content-Type", "multipart/form-data")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}