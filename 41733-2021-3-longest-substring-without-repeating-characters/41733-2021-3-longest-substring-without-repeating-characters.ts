function lengthOfLongestSubstring(s: string): number {
    const seen = new Map<string, number>();
    let l = 0;
    let maxLength = 0;

    for (let r = 0; r < s.length; r += 1) {
        const char = s[r];

        const isSeenInWindow = seen.has(char) && seen.get(char) >= l;
        if (isSeenInWindow) {
            l = seen.get(char) + 1;
        }

        seen.set(char, r);
        maxLength = Math.max(maxLength, r - l + 1);
    }

    return maxLength;
}
