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
console.log('outer edge count', visibleCount)

for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j ++) {
        if (isVisibleLeft(grid, i, j)) {
            console.log('adding one for', i, j)
            visibleCount++;
            continue;
        }

        if (isVisibleRight(grid, i, j)) {
            console.log('adding one for', i, j)
            visibleCount++;
            continue;
        }

        if (isVisibleUp(grid, i, j)) {
            console.log('adding one for', i, j)
            visibleCount++;
            continue;
        }

        if (isVisibleDown(grid, i, j)) {
            console.log('adding one for', i, j)
            visibleCount++;
            continue;
        }
    }
}

function isVisibleLeft(grid: string[][], i: number, j: number): boolean {
    const tree = grid[i][j];
    while (j > 0) {
        j--;
        if (tree <= grid[i][j]) return false;
    }
    return true;
}

function isVisibleRight(grid: string[][], i: number, j: number): boolean {
    const tree = grid[i][j];
    while (j < grid[i].length - 1) {
        j++;
        if (tree <= grid[i][j]) return false;
    }
    return true;
}

function isVisibleUp(grid: string[][], i: number, j: number): boolean {
    const tree = grid[i][j];
    while (i > 0) {
        i--;
        if (tree <= grid[i][j]) return false;
    }
    return true;
}

function isVisibleDown(grid: string[][], i: number, j: number): boolean {
    const tree = grid[i][j];
    while (i < grid.length - 1) {
        i++;
        // console.log('index', i, j)
        if (tree <= grid[i][j]) return false;
    }
    return true;
}


console.log('visible count', visibleCount)