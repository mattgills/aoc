package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func main() {
	// file, err := os.Open("test.txt")
	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	grid := [][]string{}

	sum := 0

	for scanner.Scan() {
		line := scanner.Text()

		row := []string{}

		for _, char := range line {
			row = append(row, string(char))
		}

		grid = append(grid, row)

	}

	for ri, row := range grid {
		for ci, letter := range row {
			if letter == "X" {
				sum += getCountAtIndex(grid, ri, ci)
			}
		}
	}

	fmt.Println(sum)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func getCountAtIndex(grid [][]string, rowIndex int, colIndex int) int {
	sum := 0

	startingLetter := "X"

	sum += checkNeighbor(grid, rowIndex-1, colIndex-1, startingLetter, 1)
	sum += checkNeighbor(grid, rowIndex-1, colIndex, startingLetter, 2)
	sum += checkNeighbor(grid, rowIndex-1, colIndex+1, startingLetter, 3)
	sum += checkNeighbor(grid, rowIndex, colIndex-1, startingLetter, 4)
	sum += checkNeighbor(grid, rowIndex, colIndex+1, startingLetter, 6)
	sum += checkNeighbor(grid, rowIndex+1, colIndex-1, startingLetter, 7)
	sum += checkNeighbor(grid, rowIndex+1, colIndex, startingLetter, 8)
	sum += checkNeighbor(grid, rowIndex+1, colIndex+1, startingLetter, 9)

	return sum
}

func checkNeighbor(grid [][]string, rowIndex int, colIndex int, prevLetter string, direction int) int {
	if rowIndex < 0 || colIndex < 0 || rowIndex > len(grid)-1 || colIndex > len(grid[rowIndex])-1 {
		return 0
	}

	var nextLetter string

	switch prevLetter {
	case "X":
		nextLetter = "M"
	case "M":
		nextLetter = "A"
	case "A":
		nextLetter = "S"
	default:
		return 0
	}

	if grid[rowIndex][colIndex] == nextLetter {
		if nextLetter == "S" {
			return 1
		}

		switch direction {
		case 1:
			return checkNeighbor(grid, rowIndex-1, colIndex-1, nextLetter, direction)
		case 2:
			return checkNeighbor(grid, rowIndex-1, colIndex, nextLetter, direction)
		case 3:
			return checkNeighbor(grid, rowIndex-1, colIndex+1, nextLetter, direction)
		case 4:
			return checkNeighbor(grid, rowIndex, colIndex-1, nextLetter, direction)
		case 6:
			return checkNeighbor(grid, rowIndex, colIndex+1, nextLetter, direction)
		case 7:
			return checkNeighbor(grid, rowIndex+1, colIndex-1, nextLetter, direction)
		case 8:
			return checkNeighbor(grid, rowIndex+1, colIndex, nextLetter, direction)
		case 9:
			return checkNeighbor(grid, rowIndex+1, colIndex+1, nextLetter, direction)
		}

	}

	return 0
}
