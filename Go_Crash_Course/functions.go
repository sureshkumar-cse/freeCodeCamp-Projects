package main

import "fmt"

func main() {

    fmt.Println("##### Welcome to our Todolist App! #####")

    var taskItems = []string {"Watch Go crash course", "Watch Golang Full Course", "Reward myself with a chocolate"}

    printTasks(taskItems)
    fmt.Println()

    taskItems = addTasks(taskItems, "Go for a run")
    taskItems = addTasks(taskItems, "Practice coding in Go")

    fmt.Println("Updated list")
    printTasks(taskItems)
}
func printTasks(taskItems []string) {
    fmt.Println("List of my Todos")
    for index, task := range taskItems {
        fmt.Printf("%d. %s\n", index+1, task)
    }
}

func addTasks(taskItems []string, newTask string) ([]string) {
    var updatedTaskItems = append(taskItems, newTask)
    return updatedTaskItems
}