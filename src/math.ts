/**
 * Calculates the sum of two numbers.
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 */
export function sum(a: number, b: number): number {
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
 * Divides the first number by the second.
 * @param a - Dividend
 * @param b - Divisor
 * @returns The quotient of a divided by b
 * @throws {Error} If b is zero
 */
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}

/**
 * Calculates the factorial of a number.
 * @param n - The number to calculate factorial for
 * @returns The factorial of n
 * @throws {Error} If n is negative
 */
export function factorial(n: number): number {
  if (n < 0) {
    throw new Error('Factorial is not defined for negative numbers');
  }
  if (n === 0 || n === 1) {
    return 1;
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
