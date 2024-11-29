// HTTP Server process HTTP requests from clients and delivers responses back
// http.ListenAndServe starts an HTTP Server with a given address and handler

package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", welcomeUser)

	http.ListenAndServe(":8080", nil)
}

func welcomeUser(writer http.ResponseWriter, request *http.Request) {
	var greeting = "Hello User,\nWelcome to our Todolist App!"
	fmt.Fprintln(writer, greeting)
}