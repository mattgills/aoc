package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func main() {
	file, err := os.Open("test.txt")
	// file, err := os.Open("input.txt")
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
			if letter == "A" {
				sum += checkCorners(grid, ri, ci)
			}
		}
	}

	fmt.Println(sum)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func checkCorners(grid [][]string, rowIndex int, colIndex int) int {
	if rowIndex-1 < 0 || colIndex-1 < 0 || rowIndex+1 > len(grid)-1 || colIndex+1 > len(grid[rowIndex])-1 {
		return 0
	}

	topLeft := grid[rowIndex-1][colIndex-1]
	topRight := grid[rowIndex-1][colIndex+1]
	bottomLeft := grid[rowIndex+1][colIndex-1]
	bottomRight := grid[rowIndex+1][colIndex+1]

	pair1 := topLeft + bottomRight
	pair2 := bottomLeft + topRight

	if (pair1 == "MS" || pair1 == "SM") && (pair2 == "MS" || pair2 == "SM") {
		return 1
	}

	return 0
}
