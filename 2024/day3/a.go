package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

type Pair struct {
	a int
	b int
}

func main() {
	// file, err := os.Open("test_edge.txt")
	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	count := 0
	sum := 0

	for scanner.Scan() {
		pairs := parseLine(scanner.Text())

		count += len(pairs)
		// fmt.Println(pairs)

		for _, pair := range pairs {
			fmt.Println(pair.a, pair.b, pair.a*pair.b)
			sum += pair.a * pair.b
		}
	}

	fmt.Println(count)
	fmt.Println(sum)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func parseLine(line string) []Pair {
	var pairs []Pair

	prevMatch := ""

	for i := 0; i < len(line); i++ {
		char := line[i]
		switch prevMatch {
		case "":
			if char == 'm' {
				prevMatch = "m"
			}
		case "m":
			if char == 'u' {
				prevMatch = "mu"
			} else {
				prevMatch = ""
			}
		case "mu":
			if char == 'l' {
				prevMatch = "mul"
			} else {
				prevMatch = ""
			}
		case "mul":
			if char == '(' {
				prevMatch = "mul("
			} else {
				prevMatch = ""
			}
		case "mul(":
			a, j, ok := parseFirstParam(line, i)
			fmt.Println(a, j, ok)
			i = j
			if !ok {
				prevMatch = ""
				fmt.Println("failed first param, resetting", i)
				continue
			}
			i += 1
			b, j, ok := parseSecondParam(line, i)
			fmt.Println(b, j, ok)
			i = j
			if !ok {
				prevMatch = ""
				continue
			}

			pairs = append(pairs, Pair{a: a, b: b})
			prevMatch = ""
		}
	}

	return pairs
}

func parseFirstParam(line string, j int) (int, int, bool) {
	count := 0
	param := 0
	for i := j; i < len(line); i++ {
		char := line[i]

		if char == ',' {
			if count > 0 {
				return param, i, true
			} else {
				return 0, i, false
			}
		}
		fmt.Println("char", char)
		charValue := int(char - '0')
		fmt.Println("char value", charValue)

		if charValue < 0 || charValue > 9 {
			return 0, i, false
		}

		param = (param * 10) + charValue
		fmt.Println("param", param)
		count++
	}

	return 0, len(line), false
}

func parseSecondParam(line string, j int) (int, int, bool) {
	count := 0
	param := 0

	for i := j; i < len(line); i++ {
		char := line[i]

		if char == ')' {
			if count > 0 {
				return param, i, true
			} else {
				return 0, i, false
			}
		}

		charValue := int(char - '0')

		if charValue < 0 || charValue > 9 {
			return 0, i, false
		}

		param = (param * 10) + charValue
		count++
	}

	return 0, len(line), false
}
