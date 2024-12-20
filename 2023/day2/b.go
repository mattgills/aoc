package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

type colorCount struct {
	red   int
	blue  int
	green int
}

func main() {
	// file, err := os.Open("day2\\test.b.txt")
	file, err := os.Open("day2\\input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	sum := 0
	cm := colorCount{
		red:   12,
		blue:  14,
		green: 13,
	}

	for scanner.Scan() {
		sum += parseLine(scanner.Text(), cm)

	}

	fmt.Printf("Sum: %d\n", sum)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func parseLine(s string, cm colorCount) int {
	// fmt.Printf("%v\n", strings.Split(s, ": "))
	rounds := strings.Split(strings.Split(s, ":")[1], ";")

	maxRed := 0
	maxBlue := 0
	maxGreen := 0

	for _, round := range rounds {
		fmt.Printf("%s\n", round)
		dice := strings.Split(round, ",")

		for _, pair := range dice {
			fmt.Printf("%s\n", pair)
			pair = strings.Trim(pair, " ")
			p := strings.Split(pair, " ")
			d, err := strconv.Atoi(p[0])
			if err != nil {
				log.Fatal("Not a number???")
			}
			color := p[1]

			switch color {
			case "red":
				if d > maxRed {
					maxRed = d
				}
				break
			case "blue":
				if d > maxBlue {
					maxBlue = d
				}
				break
			case "green":
				if d > maxGreen {
					maxGreen = d
				}
				break
			}

		}
	}
	fmt.Printf("%d\n", maxRed*maxBlue*maxGreen)
	return maxRed * maxBlue * maxGreen
}
