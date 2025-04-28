function majorityElement(nums: number[]): number {
    let candidate = null;
    let count = 0;

    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }

        if (num === candidate) {
            count += 1;
        } else {
            count -= 1;
        }
    }

    return candidate; 
};
