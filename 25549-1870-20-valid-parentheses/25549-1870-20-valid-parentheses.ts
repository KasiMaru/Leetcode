function isValid(s: string): boolean {
    const openToClose = {'(': ')', '[': ']', '{': '}'} as const;
    const bStack: Array<keyof typeof openToClose> = [];

    for (const bracket of s) {
        const opening = openToClose[bracket];

        if (opening) {
            bStack.push(opening);
            continue;
        };

        const closing = bStack[bStack.length - 1] === bracket;
        if (closing) {
             bStack.pop();
        } else {
            return false;
        };
    }

    return bStack.length === 0;
};