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
    const matchResult = row.split(' ')[1]
    if (opponent && matchResult) {
        if (matchResult === 'Y') {
            totalScore += opponent.charCodeAt(0) - 64;
            totalScore += 3;
        } else if (matchResult === 'X') {
            if (opponent === 'A') {
                totalScore += 3;
            } else if (opponent === 'B') {
                totalScore += 1;
            } else {
                totalScore += 2;
            }
        } else {
            totalScore += 6;
            if (opponent === 'A') {
                totalScore += 2;
            } else if (opponent === 'B') {
                totalScore += 3;
            } else {
                totalScore += 1;
            }
        }
    }
}

console.log('total score', totalScore)
