// const text = await Deno.readTextFileSync("./test2.txt");
const text = await Deno.readTextFileSync("./input.txt");
const rows = text.split('\r\n');

const GRID_SIZE = 1000;

const grid: string[][]= new Array(GRID_SIZE).fill(null).map(_ => new Array(GRID_SIZE).fill('.'))
grid[GRID_SIZE/2][GRID_SIZE/2] = 's'

const snake: [number, number][] = new Array(10).fill(null).map(_ => new Array(2).fill(GRID_SIZE / 2));

console.log('snake', snake)

for (const row of rows) {
    const [direction, amt] = row.split(' ');
    const amount = parseInt(amt);
    
    for (let i = 1; i <= amount; i++) {
        const newHead = getNewCoordinates(direction, snake[0]);
        // let prevCoords: [number, number] = [...snake[0]];
        snake[0] = newHead;

        for (let j = 1; j < snake.length; j++) {
            const newTailSegment = getNewTailCoordinates(snake[j-1], snake[j]);
            // prevCoords = [...snake[j]];
            snake[j] = [...newTailSegment];
        }
        markTailAsVisited();

        // const newHead = getNewCoordinates(direction, snake[0])
        // console.log('new head', newHead)
        // snake.unshift(newHead);
        // snake.pop();
        // markTailAsVisited();
    }
}

console.log('number spaces of touched by tail', grid.flat().filter(x => x === '#' || x === 's').length)

let str =''
for (let i = 0; i < grid.length; i++) {
    str += grid[i].join(',')
    str += '\n'
    Deno.writeFileSync('./out.txt', new TextEncoder().encode(str), {create: true});
}

function shouldCurrentTailSegmentMove(prev: [number, number], curr: [number, number]): boolean {
    const diffY = Math.abs(prev[0] - curr[0]);
    const diffX = Math.abs(prev[1] - curr[1]);

    return diffX > 1 ||  diffY > 1; 
}

function getNewTailCoordinates(prevSegment: [number, number], currSegment: [number, number]): [number, number] {
    // const diffX = Math.abs(currLead[0] - currSegment[0]);
    // const diffY = Math.abs(currLead[1] - currSegment[1]); 
    const diffY = prevSegment[0] - currSegment[0];
    const diffX = prevSegment[1] - currSegment[1];
    
    const res: [number, number] = [currSegment[0], currSegment[1]]; 

    if (diffY < -1) {
        res[0]--;
        if (diffX !== 0) res[1] += diffX / Math.abs(diffX);
        return res;
    }
    if (diffY > 1) {
        res[0]++;
        if (diffX !== 0) res[1] += diffX / Math.abs(diffX);
        return res;
    }
    if (diffX < -1) {
        res[1]--;
        if (diffY !== 0) res[0] += diffY / Math.abs(diffY);
        return res;
    }
    if (diffX > 1) {
        res[1]++;
        if (diffY !== 0) res[0] += diffY / Math.abs(diffY);
        return res;
    }

    // console.log(prevSegment, currSegment, diffY, diffX, res)
    return res;
    // if (diffY > 1 || diffY > 1) {
    //     return [prevLead[0], prevLead[1]];
    // } else {
    //     return [currSegment[0], currSegment[1]];
    // }
}

function getNewCoordinates(dir: string, c: [number, number]): [number, number] {
    switch (dir) {
        case 'U':
            return [c[0] - 1, c[1]];
        case 'D':
            return [c[0] + 1, c[1]];
        case 'R':
            return [c[0], c[1] + 1];
        default:
            return [c[0], c[1] - 1];
    }
}

function markTailAsVisited(): void {
    const l = snake.length - 1;
    const tailY = snake[l][0];
    const tailX = snake[l][1];
    console.log('current snake', snake)
    if (grid[tailY][tailX] !== 's') {
        grid[tailY][tailX] = '#';
    }
}
