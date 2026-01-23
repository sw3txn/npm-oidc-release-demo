import { add, multiply } from './math';

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
});
