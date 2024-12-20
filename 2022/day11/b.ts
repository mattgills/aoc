import {
    parse as yamlParse,
    parseAll as yamlParseAll,
    stringify as yamlStringify,
} from 'https://deno.land/std@0.82.0/encoding/yaml.ts';

type OperationConfig = { type: string, secondParam: 'old' | number }
type TestConfig = { secondParam: number; nextMonkeyIndexIfTrue: number; nextMonkeyIndexIfFalse: number; }

class Monkey {
    items: number[]
    operationConfig: OperationConfig
    testConfig: TestConfig
    totalInspections: number

    constructor(items: number[], operationConfig: OperationConfig, testConfig: TestConfig) {
        this.items = items;
        this.operationConfig = operationConfig;
        this.testConfig = testConfig;
        this.totalInspections = 0;
    }

    updateWorryLevel(index: number, modulus: number): void {
        const item = this.items[index];
        const { type, secondParam } = this.operationConfig;
        let result = item;
        let secondValue: number;
        if (secondParam === 'old') {
            secondValue = item;
        } else {
            secondValue = secondParam
        }

        switch (type) {
            case 'a':
                result += secondValue;
                break;
            case 's':
                result -= secondValue;
                break;
            case 'm':
                result *= secondValue
                break;
            default:
                throw new Error(`Operation ${type} not supported`)
        }

        result = result % modulus

        this.items[index] = result;

        this.totalInspections++;
    }

    getNextMonkeyIndex(index: number): number {
        const item = this.items[index];
        const {secondParam, nextMonkeyIndexIfTrue, nextMonkeyIndexIfFalse } = this.testConfig;
        const result = item % secondParam === 0 ? nextMonkeyIndexIfTrue : nextMonkeyIndexIfFalse;
        // console.log('checking', index, item, result)
        return result;
    }
 
}

class MonkeyGame {
    monkeys: Monkey[];
    modulus: number;

    constructor() {
        this.monkeys = [];
        this.modulus = 1;
    }

    addMonkey(monkey: Monkey): void {
        this.monkeys.push(monkey);
        this.modulus *= monkey.testConfig.secondParam;
    }


    playRound(): void {
        for (let i = 0; i < this.monkeys.length; i++) {
            const monkey = this.monkeys[i];
            const queue: number[] = [];

            for (let j = 0; j < monkey.items.length; j++) {
                monkey.updateWorryLevel(j, this.modulus);

                const nextMonkeyIndex = monkey.getNextMonkeyIndex(j);

                queue.push(nextMonkeyIndex)
            }

            for (const nextIndex of queue) {
                const item = monkey.items.shift();

                if (!item) throw new Error(`Unable to remove item from monkey ${i}`);
    
                this.monkeys[nextIndex].items.push(item);
            }

        }
    }
}

// const monkeyInput = yamlParse(await Deno.readTextFile('test.txt'));
const monkeyInput = yamlParse(await Deno.readTextFile('input.txt'));
const monkeyGame = new MonkeyGame();

for (const m of monkeyInput as any[]) {
    let si: string | number = m["Starting items"];
    let items: number[];

    if (typeof si === 'string') {
        items = si.split(',').map(x => x.trim()).map(x => parseInt(x));
    } else {
        items = [si];
    }

    const type: string = m["Operation"].type;
    const secondParamRaw: string | number = m["Operation"].value;
    let secondParam: 'old' | number;
    if (typeof secondParamRaw === 'string') {
        secondParam = 'old'
    } else {
        secondParam = secondParamRaw;
    }

    const t = m['Test'];

    const monkey = new Monkey(items, { type,secondParam}, { 'secondParam': t.value, 'nextMonkeyIndexIfTrue': parseInt(t.true), 'nextMonkeyIndexIfFalse': parseInt(t.false)})

    monkeyGame.addMonkey(monkey);
}

for (let i = 0; i < 10000; i++) {
    // console.log('monkeys at start', i, monkeyGame.monkeys.map(m => m.items))
    monkeyGame.playRound();
}

console.log(monkeyGame.monkeys)

console.log('Sorted Monkey Activity:', monkeyGame.monkeys.map(m => m.totalInspections))