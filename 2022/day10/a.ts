// const text = await Deno.readTextFileSync("./test.txt");
const text = await Deno.readTextFileSync("./input.txt");
const rows = text.split('\r\n');

let currentInstruction = 0;
let actionDelay = 0;
const readTimes = new Set([20, 60, 100, 140, 180, 220]);
let totalStrength = 0;
let x = 1
let y = 0;

for (let i = 1; i <= 220; i++) {
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


    // Read Values - Signal High
    if (readTimes.has(i)) {
        const strength = x * i;
        console.log(`Read ${strength} for ${i}th cycle with value ${x}`)
        totalStrength += x * i
    }

    // Set Values - Pre Falling Edge
    if (actionDelay === 0) {
        currentInstruction++;
        x += y;
    }
}

console.log('total strength', totalStrength)