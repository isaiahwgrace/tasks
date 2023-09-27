/**
 * Consume an array of numbers, and return a new array containing
 * JUST the first and last number. If there are no elements, return
 * an empty array. If there is one element, the resulting list should
 * the number twice.
 */
export function bookEndList(numbers: number[]): number[] {
    //cover len0 & len1 edge cases
    if (numbers.length == 0) {
        return [];
    } else if (numbers.length == 1) {
        return [numbers[0], numbers[0]];
    }
    const newEndList = [numbers[0], numbers[numbers.length - 1]];
    return newEndList;
}

/**
 * Consume an array of numbers, and return a new array where each
 * number has been tripled (multiplied by 3).
 */
export function tripleNumbers(numbers: number[]): number[] {
    const multipliedNums = numbers.map((num: number): number => num * 3);
    return multipliedNums;
}

/**
 * Consume an array of strings and convert them to integers. If
 * the number cannot be parsed as an integer, convert it to 0 instead.
 */
export function stringsToIntegers(numbers: string[]): number[] {
    //feel like i'm tempting fate here. js unary + so fun

    const intList = numbers.map((str: string): number =>
        !isNaN(+str) ? +str : 0
    );

    return intList;
}

/**
 * Consume an array of strings and return them as numbers. Note that
 * the strings MAY have "$" symbols at the beginning, in which case
 * those should be removed. If the result cannot be parsed as an integer,
 * convert it to 0 instead.
 */
// Remember, you can write functions as lambdas too! They work exactly the same.
export const removeDollars = (amounts: string[]): number[] => {
    const rmDollars = amounts.map((str: string): string =>
        str[0] === "$" ? str.slice(1) : str
    );

    const parseStr = rmDollars.map((str: string): number =>
        !isNaN(+str) ? +str : 0
    );

    return parseStr;
};

/**
 * Consume an array of messages and return a new list of the messages. However, any
 * string that ends in "!" should be made uppercase. Also, remove any strings that end
 * in question marks ("?").
 */
export const shoutIfExclaiming = (messages: string[]): string[] => {
    const hasNoQuestionMark = (str: string): boolean =>
        str[str.length - 1] !== "?";

    const rmQuestions = messages.filter(hasNoQuestionMark);

    const makeShout = rmQuestions.map((str: string): string =>
        str[str.length - 1] === "!" ? str.toUpperCase() : str
    );

    return makeShout;
};

/**
 * Consumes an array of words and returns the number of words that are LESS THAN
 * 4 letters long.
 */
export function countShortWords(words: string[]): number {
    const rmShortWords = words.filter((str: string): boolean => str.length < 4);
    return rmShortWords.length;
}

/**
 * Consumes an array of colors (e.g., 'red', 'purple') and returns true if ALL
 * the colors are either 'red', 'blue', or 'green'. If an empty list is given,
 * then return true.
 */
export function allRGB(colors: string[]): boolean {
    const hasRGB = (str: string): boolean =>
        str === "red" || str === "blue" || str == "green" || str === "";

    return colors.every(hasRGB);
}

/**
 * Consumes an array of numbers, and produces a string representation of the
 * numbers being added together along with their actual sum.
 *
 * For instance, the array [1, 2, 3] would become "6=1+2+3".
 * And the array [] would become "0=0".
 */
export function makeMath(addends: number[]): string {
    const sum = addends.reduce((total: number, num: number) => total + num, 0);
    const nums = addends.length > 0 ? addends.join("+") : 0;

    return `${sum}=${nums}`;
}

/**
 * Consumes an array of numbers and produces a new array of the same numbers,
 * with one difference. After the FIRST negative number, insert the sum of all
 * previous numbers in the list. If there are no negative numbers, then append
 * the sum to the list.
 *
 * For instance, the array [1, 9, -5, 7] would become [1, 9, -5, 10, 7]
 * And the array [1, 9, 7] would become [1, 9, 7, 17]
 */
export function injectPositive(values: number[]): number[] {
    return [];
}
