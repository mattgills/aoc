package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"sort"
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

	var a, b []int
	sum := 0

	for scanner.Scan() {
		s := strings.Fields(scanner.Text())

		n1, _ := strconv.Atoi(s[0])
		n2, _ := strconv.Atoi(s[1])

		a = append(a, n1)
		b = append(b, n2)
	}

	sort.Ints(a)
	sort.Ints(b)

	for i := 0; i < len(a); i++ {
		sum += abs(a[i] - b[i])
	}

	fmt.Println(sum)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
