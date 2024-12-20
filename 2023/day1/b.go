package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	// file, err := os.Open("day1\\test.b.txt")
	file, err := os.Open("day1\\input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	sum := 0

	for scanner.Scan() {
		sum += parseLine(scanner.Text())
	}

	fmt.Printf("Sum: %d\n", sum)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func parseLine(s string) int {
	var first int
	var second int

	m := make(map[string]int)
	m["0"] = 0
	m["1"] = 1
	m["2"] = 2
	m["3"] = 3
	m["4"] = 4
	m["5"] = 5
	m["6"] = 6
	m["7"] = 7
	m["8"] = 8
	m["9"] = 9
	m["one"] = 1
	m["two"] = 2
	m["three"] = 3
	m["four"] = 4
	m["five"] = 5
	m["six"] = 6
	m["seven"] = 7
	m["eight"] = 8
	m["nine"] = 9

	currFirstIndex := len(s) + 1
	currSecondIndex := -1

	for substring, num := range m {
		firstIndex := strings.Index(s, substring)
		lastIndex := strings.LastIndex(s, substring)
		if firstIndex == -1 {
			continue
		}
		if firstIndex < currFirstIndex {
			first = num
			currFirstIndex = firstIndex
		}

		if lastIndex > currSecondIndex {
			second = num
			currSecondIndex = lastIndex
		}
	}

	fmt.Printf("Curr: %d\n", (first*10)+second)

	return (first * 10) + second
}
