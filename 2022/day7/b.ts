// const text = await Deno.readTextFileSync("./test.txt");
const text = await Deno.readTextFileSync("./input.txt");
const rows = text.split('\r\n');


class TreeNode {
    name: string;
    children: { [key: string]: TreeNode };
    files: { [key: string]: number };;
    totalSize: number;
    parent: TreeNode | null;

    constructor(name: string, parent: TreeNode | null = null) {
        this.name = name;
        this.children = {};
        this.files = {};
        this.totalSize = 0;
        this.parent = parent;
    }

    addChildNode(child: TreeNode): void {
        this.children[child.name] = child;
    }

    addFile(name: string, size: number): void {
        this.files[name] = size;
    }
}


let node: TreeNode = new TreeNode('/', null);

for (const row of rows) {
    const args = row.split(' ');
    if (args[0] === '$') {
        if (args[1] === 'cd') {
            if (args[2] !== '..') {
                // Create a new Tree Node & update current
                const requestedDir = args[2];
                const existingDir = node.children[requestedDir]
                if (!existingDir) {
                    const newNode = new TreeNode(requestedDir, node);
                    node.addChildNode(newNode);
                    node = newNode;
                } else {
                    node = existingDir;
                }
            } else {
                // Change current context to the parent & update current
                if (node.parent) {
                    node = node.parent;
                } else {
                    console.error('Attempted to navigate above root')
                }
            }
        } else {
            // ignore ls
        }
    } else {
        if (args[0] === 'dir') {
            const newNode = new TreeNode(args[1], node);
            node.addChildNode(newNode);
        } else {
            const size = parseInt(args[0]);
            const name = args[1];
            node.addFile(name, size);
            propagateFileSizeUpTreePath(node, size);
        }
    }
}

function propagateFileSizeUpTreePath(node: TreeNode, size: number): void {
    const returnStack: string[] = [];
    let currNode: TreeNode = node;
    while (currNode.parent) {
        returnStack.push(currNode.name);
        currNode.totalSize += size;
        currNode = currNode.parent;
    }

    // Add to the root node
    currNode.totalSize += size;

    // console.log('return stack', returnStack)

    // Return back down the tree
    while (returnStack.length > 0) {
        const childName = returnStack.pop();
        if (childName) {
            currNode = currNode.children[childName];
        }
    }
}

while (node.parent !== null) {
    node = node.parent;
}

// let totalSize = 0;
const FREE_SPACE = 70000000 - node.totalSize;
const REQUIRED_SPACE = 30000000 - FREE_SPACE;
console.log('free space', FREE_SPACE)
console.log('required space', REQUIRED_SPACE)
let minExceedingRequired = Infinity;
let minDirName = '';

function dfs(root: TreeNode) {

    // options.push({name: root.name, size: root.totalSize});
    if (root.totalSize > REQUIRED_SPACE) {
        if (root.totalSize < minExceedingRequired) {
            minExceedingRequired = root.totalSize;
            minDirName = root.name;
            console.log(`Found new smallest dir exceeding required space: ${root.name} with size ${root.totalSize}`);
        }
    }

    for (const dir in root.children) {
        dfs(root.children[dir]);
    }

}

dfs(node);
console.log('result', minDirName, minExceedingRequired);