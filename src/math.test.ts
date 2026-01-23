import { sum, multiply, subtract, factorial } from './math';

describe('sum', () => {
  it('should sum two positive numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('should sum negative numbers', () => {
    expect(sum(-2, -3)).toBe(-5);
  });

  it('should handle zero', () => {
    expect(sum(0, 5)).toBe(5);
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
