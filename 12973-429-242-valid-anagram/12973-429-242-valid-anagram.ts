var isAnagram = function (stringA, stringB) {
    const stringAUniques = getUniqueChars(stringA);
    const stringBUniques = getUniqueChars(stringB);

    for (const char in stringAUniques) {
        if (stringBUniques[char] !== stringAUniques[char]) {
            return false;
        }
    }

    return stringA.length === stringB.length;
};

var getUniqueChars = function (string) {
    let uniques = {};

    for (const char of string) {
        uniques[char] = uniques[char] + 1 || 1;
    }

    return uniques;
};
