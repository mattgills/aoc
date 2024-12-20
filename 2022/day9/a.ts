// const text = await Deno.readTextFileSync("./test.txt");
const text = await Deno.readTextFileSync("./input.txt");
const rows = text.split('\r\n');

const GRID_SIZE = 600;

const grid: string[][]= new Array(GRID_SIZE).fill(null).map(_ => new Array(GRID_SIZE).fill('.'))
grid[GRID_SIZE/2][GRID_SIZE/2] = 's'
let H: [number, number] = [GRID_SIZE/2, GRID_SIZE/2];
let prevH: [number, number] = [...H];
let T: [number, number] = [GRID_SIZE/2, GRID_SIZE/2];

for (const row of rows) {
    let [direction, amt] = row.split(' ');
    const amount = parseInt(amt);
    
    for (let i = 1; i <= amount; i++) {
        prevH = [...H];
        moveItem(direction, H);
        if (shouldTailMove()) {
            T = [...prevH];
            markTailAsVisited();
        }
    }
}

console.log('number spaces of touched by tail', grid.flat().filter(x => x === '#' || x === 's').length)

let str =''
for (let i = 0; i < grid.length; i++) {
    str += grid[i].join(',')
    str += '\n'
    Deno.writeFileSync('./out.txt', new TextEncoder().encode(str), {create: true});
}


function moveItem(dir: string, I: [number, number]): void {
    switch (dir) {
        case 'U':
            I[0]--;
            break;
        case 'D':
            I[0]++;
            break;
        case 'R':
            I[1]++;
            break;
        default:
            I[1]--;
    }
}

function shouldTailMove(): boolean {
    const diffY = Math.abs(H[0] - T[0]);
    const diffX = Math.abs(H[1] - T[1]);

    return diffX > 1 ||  diffY > 1; 
}

function markTailAsVisited(): void {
    // console.log('current tail', T)
    if (grid[T[0]][T[1]] !== 's') {
        grid[T[0]][T[1]] = '#';
    }
}
