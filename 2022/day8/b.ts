// const text = await Deno.readTextFileSync("./test.txt");
const text = await Deno.readTextFileSync("./input.txt");
const rows = text.split('\r\n');

const grid: string[][] = [];

for (let i = 0; i < rows.length; i++) {
    const trees = rows[i].split('');
    grid[i] = [];
    for (let j = 0; j < trees.length; j++) {
        grid[i].push(trees[j]);
    }
}

let visibleCount = (2 * (grid.length - 1)) + (2 * (grid[0].length - 1));
console.log('outer edge count', visibleCount);

let maxScenic = 0;

for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j ++) {
        const left = distanceLeft(grid, i, j);
        const right = distanceRight(grid, i, j);
        const up = distanceUp(grid, i, j);
        const down = distanceDown(grid, i, j);

        const scenicScore = left * right * up * down;

        if (scenicScore > maxScenic) maxScenic = scenicScore;
    }
}

function distanceLeft(grid: string[][], i: number, j: number): number {
    const tree = grid[i][j];
    const startIndex = j;
    while (j > 0) {
        j--;
        if (tree <= grid[i][j]) return startIndex - j;
    }
    return startIndex;
}

function distanceRight(grid: string[][], i: number, j: number): number {
    const tree = grid[i][j];
    const startIndex = j;
    while (j < grid[i].length - 1) {
        j++;
        if (tree <= grid[i][j]) return j - startIndex;
    }
    return j - startIndex;
}

function distanceUp(grid: string[][], i: number, j: number): number {
    const tree = grid[i][j];
    const startIndex = i;
    while (i > 0) {
        i--;
        if (tree <= grid[i][j]) return startIndex - i;
    }
    return startIndex;
}

function distanceDown(grid: string[][], i: number, j: number): number {
    const tree = grid[i][j];
    const startIndex = i;
    while (i < grid.length - 1) {
        i++;
        if (tree <= grid[i][j]) return i - startIndex;
    }
    return i -startIndex;
}


console.log('best scenic', maxScenic)