package main

import (
	"fmt"
	"net/http"
)

var taskItems = []string {"Watch Go crash course", "Watch Golang Full Course", "Reward myself with a chocolate"}

func main() {
	http.HandleFunc("/", welcomeUser)
	http.HandleFunc("/tasks", showTasks)

	http.ListenAndServe(":8080", nil)
}

func welcomeUser(writer http.ResponseWriter, request *http.Request) {
	var greeting = "Hello User!\nWelcome to our Todolist App!"
	fmt.Fprintln(writer, greeting)
}

func showTasks(writer http.ResponseWriter, request *http.Request) {
	for index, task := range taskItems {
		fmt.Fprintf(writer, "%d. %s\n", index+1, task)
	}
}