const text = await Deno.readTextFileSync("./input.txt");
const rows = text.split('\r\n');

let maxValue = 0;
let maxIndex = 0;
let currSum = 0;
let j = 0;

for (let i = 0; i < rows.length; i++) {
    if (rows[i] === '') {
        if (currSum > maxValue) {
            maxValue = currSum;
            maxIndex = j;
        }
        currSum = 0;
        j++;
        continue;
    }
    
    currSum += parseInt(rows[i]);
}

console.log('max value:', maxValue)
console.log('max index:', maxIndex)