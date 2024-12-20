const text = await Deno.readTextFileSync("./input.txt");

let slow = 0;
let fast = 0;
let holdingArr = [];

// while (fast < text.length) {
//     // if (holdingArr.length < 4) {
//     //     holdingArr.push(text[fast]);
//     //     fast++;
//     //     continue;
//     // }



//     // if (text.slice(slow, fast).)
//     // fast++


// }

// brute force
for (let i = 0; i < text.length; i++) {
    const subArr = text.slice(i, i + 14).split('');
    const set = new Set<string>();
    for (const item of subArr) {
        if (set.has(item)) break;
        set.add(item);
    }
    if (set.size === 14) {
        console.log('result', i + 14);
        break;
    }
}


// bvwbjplbgvbhsrlpgdmjqwftvncz
// s
// f
