package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

type colorMax struct {
	red   int
	blue  int
	green int
}

func main() {
	// file, err := os.Open("day2\\test.a.txt")
	file, err := os.Open("day2\\input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	sum := 0
	cm := colorMax{
		red:   12,
		blue:  14,
		green: 13,
	}

	i := 0

	for scanner.Scan() {
		i++
		if res := parseLine(scanner.Text(), cm); res {
			sum += i
		} else {
			fmt.Printf("Failed: %d\n", i)
		}

	}

	fmt.Printf("Sum: %d\n", sum)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func parseLine(s string, cm colorMax) bool {
	// fmt.Printf("%v\n", strings.Split(s, ": "))
	rounds := strings.Split(strings.Split(s, ":")[1], ";")

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

			max := -1

			switch color {
			case "red":
				max = cm.red
				break
			case "blue":
				max = cm.blue
				break
			case "green":
				max = cm.green
				break
			}

			if d > max {
				return false
			}
		}
	}

	return true
}
