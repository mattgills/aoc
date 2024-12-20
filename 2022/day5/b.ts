const stacks = await Deno.readTextFileSync("./stacks.txt");
const movements = await Deno.readTextFileSync("./movements.txt");
const stackRows = stacks.split('\r\n').reverse();
const movementRows = movements.split('\r\n');

const containerStacks: string[][] = []; 

for (const stackRow of stackRows) {
    const containers = stackRow.split(' ');
    for (let i = 0; i < containers.length; i++) {
        if (containers[i] === '-') continue;
        if (Array.isArray(containerStacks[i])) {
            containerStacks[i].push(containers[i])
        } else {
            containerStacks[i] = [containers[i]]
        }
    }
}

for (const movementRow of movementRows) {
    const [count, sourceIndex, destinationIndex] = movementRow.split(' ').map(x => +x);

    const sourceLength = containerStacks[sourceIndex - 1].length;
    const subArray = containerStacks[sourceIndex - 1].splice(sourceLength - count);
    containerStacks[destinationIndex - 1].push(...subArray);
}

let result = '';

for (const containerStack of containerStacks) {
    const temp = containerStack.pop();
    if (!temp) {
        console.error('resulting stack empty');
        continue;
    }
    result += temp;
}

console.log('tops', result)