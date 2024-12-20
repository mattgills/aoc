const text = await Deno.readTextFileSync("./input.txt");
const rows = text.split('\r\n');

const charMap: { [key: string]: { priorityValue: number, occurrences: number } } = {
    'a': { priorityValue: 1, occurrences: 0},
    'b': { priorityValue: 2, occurrences: 0},
    'c': { priorityValue: 3, occurrences: 0},
    'd': { priorityValue: 4, occurrences: 0},
    'e': { priorityValue: 5, occurrences: 0},
    'f': { priorityValue: 6, occurrences: 0},
    'g': { priorityValue: 7, occurrences: 0},
    'h': { priorityValue: 8, occurrences: 0},
    'i': { priorityValue: 9, occurrences: 0},
    'j': { priorityValue: 10, occurrences: 0},
    'k': { priorityValue: 11, occurrences: 0},
    'l': { priorityValue: 12, occurrences: 0},
    'm': { priorityValue: 13, occurrences: 0},
    'n': { priorityValue: 14, occurrences: 0},
    'o': { priorityValue: 15, occurrences: 0},
    'p': { priorityValue: 16, occurrences: 0},
    'q': { priorityValue: 17, occurrences: 0},
    'r': { priorityValue: 18, occurrences: 0},
    's': { priorityValue: 19, occurrences: 0},
    't': { priorityValue: 20, occurrences: 0},
    'u': { priorityValue: 21, occurrences: 0},
    'v': { priorityValue: 22, occurrences: 0},
    'w': { priorityValue: 23, occurrences: 0},
    'x': { priorityValue: 24, occurrences: 0},
    'y': { priorityValue: 25, occurrences: 0},
    'z': { priorityValue: 26, occurrences: 0},
    'A': { priorityValue: 27, occurrences: 0},
    'B': { priorityValue: 28, occurrences: 0},
    'C': { priorityValue: 29, occurrences: 0},
    'D': { priorityValue: 30, occurrences: 0},
    'E': { priorityValue: 31, occurrences: 0},
    'F': { priorityValue: 32, occurrences: 0},
    'G': { priorityValue: 33, occurrences: 0},
    'H': { priorityValue: 34, occurrences: 0},
    'I': { priorityValue: 35, occurrences: 0},
    'J': { priorityValue: 36, occurrences: 0},
    'K': { priorityValue: 37, occurrences: 0},
    'L': { priorityValue: 38, occurrences: 0},
    'M': { priorityValue: 39, occurrences: 0},
    'N': { priorityValue: 40, occurrences: 0},
    'O': { priorityValue: 41, occurrences: 0},
    'P': { priorityValue: 42, occurrences: 0},
    'Q': { priorityValue: 43, occurrences: 0},
    'R': { priorityValue: 44, occurrences: 0},
    'S': { priorityValue: 45, occurrences: 0},
    'T': { priorityValue: 46, occurrences: 0},
    'U': { priorityValue: 47, occurrences: 0},
    'V': { priorityValue: 48, occurrences: 0},
    'W': { priorityValue: 49, occurrences: 0},
    'X': { priorityValue: 50, occurrences: 0},
    'Y': { priorityValue: 51, occurrences: 0},
    'Z': { priorityValue: 52, occurrences: 0},
} 


for (const row of rows) {
    const set = new Set<string>();
    const chars = row.split('');
    const halfIndex = Math.ceil(chars.length / 2);
    const firstHalf = chars.slice(0, halfIndex);
    const secondHalf = chars.slice(halfIndex)

    for (const char of firstHalf) {
        set.add(char);
    }

    for (const char of secondHalf) {
        if (set.has(char)) {
            console.log(`${char} is common in ${row}`)
            charMap[char].occurrences++;
            break;
        }
    }

}

let totalPriority = 0;

for (const char in charMap) {
    totalPriority += charMap[char].priorityValue * charMap[char].occurrences;
}

console.log('total priority', totalPriority)