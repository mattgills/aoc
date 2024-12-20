// const text = await Deno.readTextFileSync("./test.txt");
const text = await Deno.readTextFileSync("./input.txt");
const rows = text.split('\r\n');

let start: [number, number] = [-1, -1];
let end: [number, number] = [-1, -1];
const graph: number[][] = [];

for (let i = 0; i < rows.length; i++) {
    graph.push(new Array(0));
    const nodes = rows[i].split('');
    for (let j = 0; j < nodes.length; j++) {
        const node = nodes[j];
        let height: number;
        if (node === 'S') {
            start = [i, j];
            height = 1; // 1 lower than a
        } else if (node === 'E') {
            end = [i, j];
            height = 26; // 1 higher than z
        } else {
            height = node.charCodeAt(0) - 96;
        } 
        graph[i].push(height);
    }
}

console.log('start', start, graph[start[0]][start[1]])
console.log('end', end, graph[end[0]][end[1]])

type QueueEntry = { x: number, y: number; level: number }

let results: QueueEntry[] = [];

const queue: QueueEntry[] = [];
queue.push({ x: end[1], y: end[0], level: 0});

const visited = new Set<string>();

while (queue.length > 0) {
    const position = queue.shift();
    if(!position) throw new Error('not position to dequeue...')
    const { x, y, level } = position;
    const key = `${x},${y}`;
    
    if (visited.has(key)) continue;
    visited.add(key);

    if (graph[y][x] === 1) {
        results.push(position);
        break;
    }

    const currHeight = graph[y][x];
    const nextLevel = level + 1;

    if (y > 0 && currHeight - 1 <= graph[y - 1][x]) {
        queue.push({ x, y: y - 1, level: nextLevel });
    }

    if (y < graph.length - 1 && currHeight - 1 <= graph[y + 1][x]) {
        queue.push({ x, y: y + 1, level: nextLevel });
    }

    if (x > 0 && currHeight - 1 <= graph[y][x - 1]) {
        queue.push({ x: x - 1, y, level: nextLevel });
    }

    if (x < graph[0].length - 1 && currHeight - 1 <= graph[y][x + 1]) {
        queue.push({ x: x + 1, y, level: nextLevel });
    }
}

console.log('result', results)