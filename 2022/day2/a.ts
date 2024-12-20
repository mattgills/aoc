// win = 6
// draw = 3
// loss = 0
// A / X - Rock
// B / Y - Paper
// C / Z - Scissors

const text = await Deno.readTextFileSync("./input.txt");
const rows = text.split('\r\n');
let totalScore = 0;

for (const row of rows) {
    const opponent = row.split(' ')[0]
    const me = convertToAbc(row.split(' ')[1])
    if (opponent && me) {
        console.log(opponent, me)
        if (opponent === me) {
            totalScore += me.charCodeAt(0) - 64;
            totalScore += 3;
            continue;
        }
    
        if (opponent === 'A' && me === 'C') {
            totalScore += me.charCodeAt(0) - 64;
            continue;
        }
    
        if (opponent === 'C' && me === 'A') {
            totalScore += me.charCodeAt(0) - 64;
            totalScore += 6;
            continue;
        }
    
        if (me > opponent) {
            totalScore += me.charCodeAt(0) - 64;
            totalScore += 6;
        } else {
            totalScore += me.charCodeAt(0) - 64;
        }
    }
}

console.log('total score', totalScore)

function convertToAbc(og: string): string {
    if (og === 'X') return 'A';
    if (og === 'Y') return 'B';
    return 'C'
}