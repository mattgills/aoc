// const text = await Deno.readTextFileSync("./test.txt");
const text = await Deno.readTextFileSync("./input.txt");
const rows = text.split('\r\n').filter(r => r !== '');

const firstDecoderPacket = [[2]];
const secondDecoderPacket = [[6]];
const packetsArr: number[][][] = [firstDecoderPacket, secondDecoderPacket]

for (let j = 0; j < rows.length; j++) {
    packetsArr.push(eval(rows[j]));
}

packetsArr.sort((a, b) => isCorrectOrder(a, b) ? -1 : 1)

console.log('first index', packetsArr.indexOf(firstDecoderPacket));
console.log('second index', packetsArr.indexOf(secondDecoderPacket));


function isCorrectOrder(left: any[], right: any[]): boolean | null {
    // console.log('comparing', left, right)
    const ll = left.length;
    const rl = right.length;
    const ml = Math.max(ll, rl);
    
    let result: boolean | null = null;

    for (let i = 0; i < ml; i++) {
        if (left[i] === undefined) {
            // console.log('left ran out');
            return true;
        }
        if (right[i] === undefined) {
            // console.log('right ran out');
            return false;
        }
        const l = left[i];
        const r = right[i];

        if (Array.isArray(l) && Array.isArray(r)) {
            result = isCorrectOrder(l, r);
        } else if (Array.isArray(l)) {
            result = isCorrectOrder(l, [r]);
        } else if (Array.isArray(r)) {
            result = isCorrectOrder([l], r);
        } else if (l > r) {
            // console.log(l, '>', r);
            return false;
        } else if (l < r) {
            // console.log(l, '<', r);
            return true;
        } else {
            // console.log(l, '=', r);
        }
        
        if (result !== null) return result;
    }

    return ll < rl ? true : null;
}