export class LLNode<T> {
    val: T;
    next: LLNode<T> | null;
    prev: LLNode<T> | null;

    constructor(val: T) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

interface List<T> {
    head: LLNode<T>
    tail: LLNode<T>
    size: number;
}

export class LinkedList<T> implements Iterable<T> {
    private list: List<T> | undefined;

    public constructor() {
        this.list = undefined;
    }

    public size(): number {
        if (this.list) {
            return this.list.size;
        }

        return 0;
    }

    public isEmpty(): boolean {
        return !this.list;
    }

    public toArray(): T[] {
        const LLArray: T[] = [];

        let currentNode = this.list?.head ?? null;
        while (currentNode) {
            LLArray.push(currentNode.val);
            currentNode = currentNode.next;
        }

        return LLArray;
    }

    //      [a, b, c]
    //          |
    // (a) <-> (b) <-> (c)
    public fromArray(arr: T[]) {
        const newNode = new LLNode(arr[0]);

        this.list = {
            head: newNode,
            tail: newNode,
            size: 1,
        };

        for (let i = 1; i < arr.length; i += 1) {
            this.addBack(arr[i]);
        }

        return this;
    }

    // (*)
    // h|       t
    // (a) <-> (b)
    // (*) <-> (a) <-> (b)
    //  h               t
    public addFront(val: T): this {
        const newNode = new LLNode(val);

        if (this.isEmpty()) {
            this.list = {
                head: newNode,
                tail: newNode,
                size: 1,
            };
        } else {
            const list = this.list!;

            list.head.prev = newNode;
            newNode.next = list.head;
            list.head = newNode;
            list.size += 1;
        }

        return this;
    }

    //                 (*)
    //  h      t        |
    // (a) <-> (b) <->  .
    // (a) <-> (b) <-> (*)
    //  h             t
    public addBack(val: T): this {
        const newNode = new LLNode(val);

        if (this.isEmpty()) {
            this.list = {
                head: newNode,
                tail: newNode,
                size: 1,
            };
        } else {
            const list = this.list!;

            list.tail.next = newNode;
            newNode.prev = list.tail;
            list.tail = newNode;
            list.size += 1;
        }

        return this;
    }

    //                 (*)
    //  h              .|       t
    // (a) <-> (b) <-> (c) <-> (d)
    // (a) <-> (b) <-> (*) <-> (c)
    //
    public addAt(position: number, val: T): this {
        if (position <= 0) {
            return this.addFront(val);
        }

        if (position >= this.size()) {
            return this.addBack(val);
        }

        let currentNode = this.traverseTo(position - 1); // 1 node before, to plug new node at pos
        const newNode = new LLNode(val);

        // Backlink
        currentNode.next!.prev = newNode;
        newNode.next = currentNode.next;

        // Frontlink
        newNode.prev = currentNode;
        currentNode.next = newNode;
        this.list!.size += 1;

        return this;
    }

    public getAt(position: number): T {
        return this.traverseTo(position).val;
    }

    public indexOf(value: T, equalsFn?: EqualsFunc<T>): number {
        if (!this.list) {
            return -1;
        }

        const fn = equalsFn || defaultEquals;

        let i = 0;
        let currentNode = this.list.head;

        while (!fn(currentNode.val, value)) {
            currentNode = currentNode.next!;
            i += 1;
        }

        return i;
    }

    //  x
    // h|               t
    // (a) <-> (b) <-> (c)
    // (b) <-> (c)
    //
    public removeFront(): this {
        if (!this.list) {
            return this;
        }

        const list = this.list;

        if (list.head.next) {
            list.head.next.prev = null;
            list.head = list.head.next;

            list.size -= 1;
        } else {
            this.list = undefined;
        }

        return this;
    }

    //                  x
    //  h              t|
    // (a) <-> (b) <-> (c)
    // (a) <-> (b)
    //
    public removeBack(): this {
        if (!this.list) {
            return this;
        }

        const list = this.list;

        if (list.tail.prev) {
            list.tail.prev.next = null;
            list.tail = list.tail.prev;

            list.size -= 1;
        } else {
            this.list = undefined;
        }

        return this;
    }

    //                  x
    //  h               |       t
    // (a) <-> (b) <-> (c) <-> (d)
    // (a) <-> (b) <-> (d)
    //
    public removeAt(position: number): this {
        if (position <= 0) {
            return this.removeFront();
        }

        if (position >= this.size()) {
            return this.removeBack();
        }

        let currentNode = this.traverseTo(position);
        currentNode.next!.prev = currentNode.prev;
        currentNode.prev!.next = currentNode.next;

        this.list!.size -= 1;

        return this;
    }

    public clear(): this {
        this.list = undefined;
        return this;
    }

    *[Symbol.iterator](): Iterator<T> {
        if (!this.list) return null;

        let current: LLNode<T> | null;

        for (current = this.list.head; current !== null; current = current.next) {
            yield current.val;
        }
    }

    private traverseTo(position: number): LLNode<T> {
        const list = this.list!;
        let currentNode = list.head;

        for (let i = 0; i < position; i += 1) {
            currentNode = currentNode.next!;
        }

        return currentNode;
    }
};

// Test 1: Quick creation
const list = new LinkedList<number>().fromArray([3, 2, 1]);
console.log(list.toArray());

// Test 2: Adding elements to front
list.addFront(4);
list.addFront(5);
list.addFront(6);
console.log('After adding to front:', list.toArray());

// Test 3: Adding elements to back
list.addBack(0);
list.addBack(-1);
console.log('After adding to back:', list.toArray());

list.addAt(2, 999);
console.log('After adding to 2:', list.toArray());

console.log(list.getAt(3));

console.log(list.removeAt(0));


const defaultEquals = <T>(a: T, b: T): boolean => {
    return a === b;
}

interface EqualsFunc<T> {
    (a: T, b: T): boolean;
}