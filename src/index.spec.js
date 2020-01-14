/* your test code goes here. */

class StringCalculator {
  add(inputString) {
    let delimiter = ",";
    const errorArray = [];

    if (inputString === "") {
      return 0;
    }

    if (inputString.substring(0, 2) === "//") {
      delimiter = inputString.substring(2, 3);
      inputString = inputString.substring(4, inputString.length);
    }

    let inputStringArr = inputString.replace(/\n/g, delimiter).split(delimiter);
    let total = 0;

    inputStringArr.forEach(element => {
      let parsedElement = parseInt(element);

      if (parsedElement >= 0) {
        if (parsedElement <= 1000) {
          total += parseInt(element);
        }
      } else {
        errorArray.push(parseInt(parsedElement));
      }
    });

    if (errorArray.length > 0) {
      throw Error(`negatives not allowed: ${errorArray}`);
    }

    return total;
  }
}

describe("stringCalculator.add", () => {
  it("should return 0 for an empty string.", () => {
    const stringCalculator = new StringCalculator();
    const result = stringCalculator.add("");

    expect(result).toEqual(0);
  });

  it("should return one number for an input of one number.", () => {
    const stringCalculator = new StringCalculator();
    const result = stringCalculator.add("1");

    expect(result).toEqual(1);
  });

  it("should return the sum of two numbers seperated by a comma.", () => {
    const stringCalculator = new StringCalculator();
    const result = stringCalculator.add("1,2");

    expect(result).toEqual(3);
  });

  it("should return the sum of an unknown amount of numbers.", () => {
    const stringCalculator = new StringCalculator();
    const result = stringCalculator.add("4, 5, 2, 8, 3");

    expect(result).toEqual(22);
  });

  const multipleElementsTestCases = [
    { input: "4, 5, 2, 8, 3", expected: 22 },
    { input: "4, 7, 2", expected: 13 },
    { input: "0, 45, 39, 4", expected: 88 }
  ];

  multipleElementsTestCases.forEach(({ input, expected }) => {
    it(`Should return the sum of multiple result ${input} => ${expected}`, () => {
      const stringCalculator = new StringCalculator();
      const result = stringCalculator.add(input);

      expect(result).toEqual(expected);
    });
  });

  it("should handle new lines between numbers in addition to commas.", () => {
    const stringCalculator = new StringCalculator();
    const result = stringCalculator.add("4\n 6, 9");

    expect(result).toEqual(19);
  });

  it("should handle a string with custom delimiters", () => {
    const stringCalculator = new StringCalculator();
    const result = stringCalculator.add("//=\n4=5\n9=3\n7");

    expect(result).toEqual(28);
  });

  it("should not have any negative numbers.", () => {
    const stringCalculator = new StringCalculator();

    const action = function() {
      stringCalculator.add("-5, -6");
    };
    expect(action).toThrow(new Error("negatives not allowed: -5,-6"));
  });

  it("should ignore numbers greater than 1000", () => {
    const stringCalculator = new StringCalculator();
    const result = stringCalculator.add("1, 2\n3, 1004");

    expect(result).toEqual(6);
  });

  it("should handle delimiters of any length.", () => {
    const stringCalculator = new StringCalculator();
    const result = stringCalculator.add("//[fad]\n34fad23fad67fad\n5");

    expect(result).toEqual(129);
  });
});
