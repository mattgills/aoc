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

	sum := 0

	for scanner.Scan() {
		s := strings.Fields(scanner.Text())

		safe := isSafe(s)

		if safe {
			sum++
		} else {
			for i := 0; i < len(s); i++ {
				s2 := make([]string, len(s))
				s3 := make([]string, len(s)-1)
				copy(s2, s)
				s3 = append(s2[:i], s2[i+1:]...)
				safe := isSafe(s3)

				if safe {
					sum++
					break
				}
			}
		}
	}

	fmt.Println(sum)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func isSafe(s []string) bool {
	increasing := false

	// if only one entry it's safe
	// assumption: no zero entry levels
	if len(s) < 2 {
		return true
	}

	n1, _ := strconv.Atoi(s[0])
	n2, _ := strconv.Atoi(s[1])

	diff := abs(n1 - n2)

	if n1 == n2 || diff < 1 || diff > 3 {
		return false
	} else if n1 < n2 {
		increasing = true
	}

	for i := 1; i < len(s); i++ {
		prev, _ := strconv.Atoi(s[i-1])
		curr, _ := strconv.Atoi(s[i])

		diff := abs(curr - prev)

		if ((increasing && curr > prev) || (!increasing && curr < prev)) && diff >= 1 && diff <= 3 {
			prev = curr
			continue
		} else {
			return false
		}
	}

	return true
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
