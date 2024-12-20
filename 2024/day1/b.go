package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	// file, err := os.Open("test.txt")
	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	var a []int
	var m = make(map[int]int)
	sum := 0

	for scanner.Scan() {
		s := strings.Fields(scanner.Text())

		n1, _ := strconv.Atoi(s[0])
		n2, _ := strconv.Atoi(s[1])

		a = append(a, n1)
		x, exists := m[n2]
		if exists {
			m[n2] = x + 1
		} else {
			m[n2] = 1
		}
	}

	for i := 0; i < len(a); i++ {
		x, exists := m[a[i]]

		if exists {
			sum += x * a[i]
		}
	}

	fmt.Println(sum)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}
