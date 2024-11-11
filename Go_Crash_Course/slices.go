// An array has a fixed size. A slice, on the other hand, is a dynamically-sized, flexible view into the elements of an array. In practice, slices are much more common than arrays.
// The type []T is a slice with elements of type T.

package main

import "fmt"

func main() {

	var taskItems = []string {"Watch Go crash course", "Watch Golang Full Course", "Reward myself with a chocolate"}

	fmt.Println("##### Welcome to our Todolist App! #####")

	fmt.Println("List of my Todos")
	fmt.Println("Tasks:", taskItems)

	var s []string = taskItems[1:3]
	fmt.Println(s)
}