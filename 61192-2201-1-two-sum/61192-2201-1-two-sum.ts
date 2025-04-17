function twoSum(nums: number[], target: number): number[] {
    const dict = {};

    for (let i = 0; i < nums.length; i += 1) {
        const match = target - nums[i];

        if (dict[match] !== undefined) {
            return [dict[match], i];
        }

        dict[nums[i]] = i;
    }

    return [];
}