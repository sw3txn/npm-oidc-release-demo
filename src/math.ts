/**
 * Adds two numbers together.
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Multiplies two numbers together.
 * @param a - First number
 * @param b - Second number
 * @returns The product of a and b
 */
export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * Subtracts the second number from the first.
 * @param a - First number
 * @param b - Second number
 * @returns The difference of a and b
 */
export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Calculates the factorial of a number.
 * @param n - The number to calculate factorial for
 * @returns The factorial of n
 * @throws {Error} If n is negative
 */
export const factorial = (() => {
  const cache = new Map<number, number>();

  return (n: number): number => {
    if (n < 0) {
      throw new Error('Factorial is not defined for negative numbers');
    }
    if (n === 0 || n === 1) {
      return 1;
    }

    if (cache.has(n)) {
      return cache.get(n)!;
    }

    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }

    cache.set(n, result);
    return result;
  };
})();
