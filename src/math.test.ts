import { add, multiply, subtract, factorial } from './math';

describe('add', () => {
  it('should add two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should add negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
  });

  it('should handle zero', () => {
    expect(add(0, 5)).toBe(5);
  });
});

describe('multiply', () => {
  it('should multiply positive numbers', () => {
    expect(multiply(2, 3)).toBe(6);
  });

  it('should handle negative numbers', () => {
    expect(multiply(-2, 3)).toBe(-6);
  });
});

describe('subtract', () => {
  it('should subtract numbers', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});

describe('factorial', () => {
  it('should calculate factorial of 0', () => {
    expect(factorial(0)).toBe(1);
  });

  it('should calculate factorial of 1', () => {
    expect(factorial(1)).toBe(1);
  });

  it('should calculate factorial of positive numbers', () => {
    expect(factorial(5)).toBe(120);
    expect(factorial(3)).toBe(6);
  });

  it('should throw error for negative numbers', () => {
    expect(() => factorial(-1)).toThrow('Factorial is not defined for negative numbers');
  });
});
