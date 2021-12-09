import getInput from "../../../utils/getInput";

let input = getInput("2021", "3");
// input = `00100
// 11110
// 10110
// 10111
// 10101
// 01111
// 00111
// 11100
// 10000
// 11001
// 00010
// 01010`;

const inputs = input.split("\n");
const NB_CHAR = 12;
const findMostCommon = (inputs: string[], pos: number) => {
  let zeros = 0;
  let ones = 0;
  inputs.map((line) => {
    if (line[pos] === "1") {
      ones++;
    } else {
      zeros++;
    }
  });
  if (zeros > ones) {
    return 0;
  } else if (ones > zeros) {
    return 1;
  } else {
    return 2;
  }
};

const part1 = () => {
  let gamma = "";
  let epsilon = "";

  for (let i = 0; i < NB_CHAR; i++) {
    const mostCommon = findMostCommon(inputs, i);
    if (mostCommon) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
  }
  console.log(gamma, epsilon);
  console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
};

const part2 = () => {
  let oxygen = 0;
  let CO2 = 0;
  let oxygenFilteredInputs = inputs;
  let CO2FilteredInputs = inputs;
  for (let i = 0; i < NB_CHAR; i++) {
    const mostCommon = findMostCommon(oxygenFilteredInputs, i);
    if (mostCommon == 0) {
      oxygenFilteredInputs = oxygenFilteredInputs.filter((v) => v[i] == "0");
    } else if (mostCommon == 1) {
      oxygenFilteredInputs = oxygenFilteredInputs.filter((v) => v[i] == "1");
    } else {
      // same amount
      oxygenFilteredInputs = oxygenFilteredInputs.filter((v) => v[i] == "1");
    }
    const mostCommonC = findMostCommon(CO2FilteredInputs, i);
    if (mostCommonC == 0) {
      CO2FilteredInputs = CO2FilteredInputs.filter((v) => v[i] == "1");
    } else if (mostCommonC == 1) {
      CO2FilteredInputs = CO2FilteredInputs.filter((v) => v[i] == "0");
    } else {
      // same amount
      CO2FilteredInputs = CO2FilteredInputs.filter((v) => v[i] == "0");
    }
    if (oxygenFilteredInputs.length === 1) {
      oxygen = parseInt(oxygenFilteredInputs[0], 2);
      console.log({ oxygenFilteredInputs });
    }
    if (CO2FilteredInputs.length === 1) {
      CO2 = parseInt(CO2FilteredInputs[0], 2);
      console.log(CO2FilteredInputs);
    }
    // console.log(i, mostCommon, CO2FilteredInputs);
  }
  console.log(oxygen, CO2, oxygen * CO2);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
