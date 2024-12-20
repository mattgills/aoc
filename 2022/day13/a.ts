// const text = await Deno.readTextFileSync("./test.txt");
const text = await Deno.readTextFileSync("./input.txt");
const rows = text.split('\r\n').filter(r => r !== '');

class PacketPair {
    packets: number[][];
    index: number;

    constructor(index: number) {
        this.packets = [];
        this.index = index;
    }

    addPacket(packet: number[]): void {
        this.packets.push(packet);
    }
}


const packetPairs: PacketPair[] = [];

let i = 1;
let packetPair: PacketPair = new PacketPair(0);

for (let j = 0; j < rows.length; j++) {
    if (j % 2 === 0) {
        packetPair = new PacketPair(i);
        packetPair.addPacket(eval(rows[j]));
    } else {
        packetPair.addPacket(eval(rows[j]))
        packetPairs.push(packetPair);
        i++;
    }
}

let total = 0;

for (const packetPair of packetPairs) {
    let [left, right] = packetPair.packets;

    if (!Array.isArray(left)) left = [left];
    if (!Array.isArray(right)) right = [right];

    const result = isCorrectOrder(left, right);

    if (result) {
        console.log(`Adding ${packetPair.index} to total`);
        total += packetPair.index;
    }
}

console.log('total', total);

function isCorrectOrder(left: number[], right: number[]): boolean | null {
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