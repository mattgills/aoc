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
	file, err := os.Open("test.txt")
	// file, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	evaluate := false

	m := make(map[int][]int)

	sum := 0

	for scanner.Scan() {
		line := scanner.Text()

		if line == "" {
			evaluate = true
			continue
		}

		if !evaluate {
			s := strings.Split(line, "|")
			x, _ := strconv.Atoi(s[0])
			y, _ := strconv.Atoi(s[1])

			if arr, ok := m[x]; ok {
				m[x] = append(arr, y)
			} else {
				m[x] = []int{y}
			}
		} else {
			// fmt.Println("Checking line", line)
			sum += isLineValid(line, m)
		}
	}

	// fmt.Println(m)
	fmt.Println(sum)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func isLineValid(line string, m map[int][]int) int {
	seen := make(map[int]bool)

	items := strings.Split(line, ",")

	for _, item := range items {
		d, _ := strconv.Atoi(item)

		for _, forbidden := range m[d] {
			if seen[forbidden] {
				// fmt.Println("Failed", d, forbidden)
				return 0
			}
		}

		seen[d] = true
	}

	middleItem, _ := strconv.Atoi(items[(len(items) / 2)])
	// fmt.Println("Passed", middleItem)
	return middleItem
}
