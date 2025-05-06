var groupAnagrams = function (strs: string[]): string[][] {
    const anagramMap = new Map<string, string[]>();

    for (const str of strs) {
        const key = getAnagramKey(str);

        if (anagramMap.has(key)) {
            anagramMap.get(key)!.push(str);
        } else {
            anagramMap.set(key, [str]);
        }
    }

    return Array.from(anagramMap.values());
};

function getAnagramKey(str: string): string {
    const count = new Array(26).fill(0);

    for (const char of str) {
        const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
        count[index] += 1;
    }

    return count.join('#');
}