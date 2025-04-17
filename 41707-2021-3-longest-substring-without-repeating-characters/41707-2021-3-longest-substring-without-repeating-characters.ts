function lengthOfLongestSubstring(s: string): number {
    const seen = new Map<string, number>();
    let start = 0;
    let maxLength = 0;

    for (let end = 0; end < s.length; end += 1) {
        const char = s[end];

        if (seen.has(char) && seen.get(char)! >= start) {
            start = seen.get(char)! + 1;
        }

        seen.set(char, end);
        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
}
