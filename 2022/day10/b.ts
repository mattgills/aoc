// const text = await Deno.readTextFileSync("./test.txt");
const text = await Deno.readTextFileSync("./input.txt");
const rows = text.split('\r\n');

const SCREEN_WIDTH = 40;
const SCREEN_HEIGHT = 6;
const screen: string[][]= new Array(SCREEN_HEIGHT).fill(null).map(_ => new Array(SCREEN_WIDTH).fill('.'))

let currentInstruction = 0;
let actionDelay = 0;
let x = 1
let y = 0;


for (let i = 0; i < screen.length; i++) {
    for (let j = 0; j < screen[i].length; j++) {
        // console.log(i, actionDelay, x)
        if (actionDelay === 0) {
            const [instruction, amt] = rows[currentInstruction].split(' ');
            // console.log(i, instruction, amt)
            if (instruction === 'noop') {
                // read only, increment instruction, no extra cycle
                actionDelay = 0;
                y = 0;
            } else {
                y = parseInt(amt);
                actionDelay = 1; 
            }
        } else {
            actionDelay--;
        }

        // Draw CRT
        if (j >= x - 1 && j <= x + 1) {
            screen[i][j] = '#'
        }

        // Set Values - Pre Falling Edge
        if (actionDelay === 0) {
            currentInstruction++;
            x += y;
        }
    }
}

let str =''
for (let i = 0; i < screen.length; i++) {
    str += screen[i].join('')
    str += '\n'
    Deno.writeFileSync('./out.txt', new TextEncoder().encode(str), {create: true});
}
