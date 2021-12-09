import getInput from "../../../utils/getInput";
import * as fs from "fs";

const input = getInput("2021", "6")
  .split(",")
  .map((v) => +v);

function groupBy(input: number[]) {
  const fishesByAge = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  input.map((f) => (fishesByAge[f] = fishesByAge[f] + 1));
  return fishesByAge;
}

function part1And2(input: number[], days: number): number {
  const fishesByAge = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  input.map((f) => (fishesByAge[f] = fishesByAge[f] + 1));

  const school = Array.from({ length: days }).reduce<Array<number>>(
    (school) => [
      school[1],
      school[2],
      school[3],
      school[4],
      school[5],
      school[6],
      school[7] + school[0],
      school[8],
      school[0],
    ],
    fishesByAge
  );

  return Object.values(school).reduce((a, b) => a + b, 0);
}

console.log(part1And2(input, 256));
