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
	// file, err := os.Open("test2.txt")
	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	enabled := true
	count := 0
	sum := 0

	for scanner.Scan() {
		pairs, enableState := parseLineWithEnabled(scanner.Text(), enabled)
		enabled = enableState

		count += len(pairs)
		fmt.Println(pairs)

		for _, pair := range pairs {
			// fmt.Println(pair.a, pair.b, pair.a*pair.b)
			sum += pair.a * pair.b
		}
	}

	fmt.Println(count)
	fmt.Println(sum)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func parseLineWithEnabled(line string, enabled bool) ([]Pair, bool) {
	var pairs []Pair

	prevMatch := ""

	for i := 0; i < len(line); i++ {
		char := line[i]
		switch prevMatch {
		case "":
			if char == 'm' {
				prevMatch = "m"
			} else if char == 'd' {
				prevMatch = "d"
			}
		case "d":
			if char == 'o' {
				prevMatch = "do"
			} else {
				prevMatch = ""
			}
		case "do":
			if char == '(' {
				prevMatch = "do("
			} else if char == 'n' {
				prevMatch = "don"
			} else {
				prevMatch = ""
			}
		case "do(":
			if char == ')' {
				enabled = true
			}
			prevMatch = ""
		case "don":
			if char == '\'' {
				prevMatch = "don'"
			} else {
				prevMatch = ""
			}
		case "don'":
			if char == 't' {
				prevMatch = "don't"
			} else {
				prevMatch = ""
			}
		case "don't":
			if char == '(' {
				prevMatch = "don't("
			} else {
				prevMatch = ""
			}
		case "don't(":
			if char == ')' {
				enabled = false
			}
			prevMatch = ""
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
			if !enabled {
				prevMatch = ""
				continue
			}

			a, j, ok := parseFirstParam(line, i)
			// fmt.Println(a, j, ok)
			i = j
			if !ok {
				prevMatch = ""
				// fmt.Println("failed first param, resetting", i)
				continue
			}
			i += 1
			b, j, ok := parseSecondParam(line, i)
			// fmt.Println(b, j, ok)
			i = j
			if !ok {
				prevMatch = ""
				continue
			}

			pairs = append(pairs, Pair{a: a, b: b})
			prevMatch = ""
		}
	}

	return pairs, enabled
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
		// fmt.Println("char", char)
		charValue := int(char - '0')
		// fmt.Println("char value", charValue)

		if charValue < 0 || charValue > 9 {
			return 0, i, false
		}

		param = (param * 10) + charValue
		// fmt.Println("param", param)
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
