import "@testing-library/jest-dom";

describe("true is truthy and false is falsy", () => {
  // test case 1
  test("true is truthy", () => {
    expect(true).toBe(true);
  });
  // test case 2
  test("false is falsy", () => {
    expect(false).toBe(false);
  });
});
