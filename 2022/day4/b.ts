const text = await Deno.readTextFileSync("./input.txt");
const rows = text.split('\r\n');

let count = 0;
let index = 0;

for (const row of rows) {
    const ranges = row.split(',');
    const range1Values = ranges[0].split('-');
    const start1 = parseInt(range1Values[0]);
    const end1 = parseInt(range1Values[1]);

    const range2Values = ranges[1].split('-');
    const start2 = parseInt(range2Values[0]);
    const end2 = parseInt(range2Values[1]);

    if (start2 >= start1 && start2 <= end1) count++;
    else if (start1 >= start2 && start1 <= end2) count++;
    
    index++;
}

console.log('count', count)