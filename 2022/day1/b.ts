const text = await Deno.readTextFileSync("./input.txt");
const rows = text.split('\r\n');

let maxValue = 0;
let maxIndex = 0;
let currSum = 0;
let j = 0;
const calories: number[] = [];

for (let i = 0; i < rows.length; i++) {
    if (rows[i] === '') {
        if (currSum > maxValue) {
            maxValue = currSum;
            maxIndex = j;
        }
        calories.push(currSum);
        currSum = 0;
        j++;
        continue;
    }
    
    currSum += parseInt(rows[i]);
}

console.log('max value:', maxValue)
console.log('max index:', maxIndex)

calories.sort((a, b) => b - a);
console.log('calories', calories[0], calories[1], calories[2])
console.log('sum top 3', calories[0] + calories[1] + calories[2])