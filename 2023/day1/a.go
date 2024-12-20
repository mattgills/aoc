package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func main() {
	// file, err := os.Open("day1\\test.a.txt")
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
	for i := 0; i < len(s); i++ {
		if d, err := strconv.Atoi(string(s[i])); err == nil {
			if first == 0 {
				first = d
				second = d
			} else {
				second = d
			}
		}
	}

	return (first * 10) + second
}
