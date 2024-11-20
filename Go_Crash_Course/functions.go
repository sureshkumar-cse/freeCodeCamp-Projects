package main

import "fmt"

func main() {

    fmt.Println("##### Welcome to our Todolist App! #####")

    var taskItems = []string {"Watch Go crash course", "Watch Golang Full Course", "Reward myself with a chocolate"}

    printTasks(taskItems)
    fmt.Println()

    addTasks(taskItems, "Go for a run")

    fmt.Println()
    printTasks(taskItems)
}
func printTasks(taskItems []string) {
    fmt.Println("List of my Todos")
    for index, task := range taskItems {
        fmt.Printf("%d. %s\n", index+1, task)
    }
}

func addTasks(taskItems []string, newTask string) {
    var updatedTaskItems = append(taskItems, newTask)
    printTasks(updatedTaskItems)   
}