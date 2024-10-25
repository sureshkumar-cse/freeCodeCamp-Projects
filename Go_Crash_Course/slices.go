package main

import "fmt"

func main() {
	var shortGolang = "Watch Go crash course"
	var fullGolang = "Watch Golang Full Course"
	var rewardDessert = "Reward myself with a chocolate"

	var taskItems = []string {shortGolang, fullGolang, rewardDessert}

	fmt.Println("##### Welcome to our Todolist App! #####")

	fmt.Println("List of my Todos")
	fmt.Println("Tasks:", taskItems)
}