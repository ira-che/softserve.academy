const tools = require('../views/js/script.js');

describe('Check value type is number', () => {
  it('should check 2', () => {
    expect(tools.isNumeric(2)).toBe(true);
  });
  it('should check "foo"', () => {
    expect(tools.isNumeric("foo")).toBe(false);
  });
  it('should check 2.45', () => {
    expect(tools.isNumeric(2.45)).toBe(true);
  });
});

describe('Check value prime number', () => {
  it('should check 2', () => {
    expect(tools.isNatural(2)).toBe(true);
  });
});
