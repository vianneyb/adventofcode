import getInput from "../../../utils/getInput";

const input = getInput("2021", "1");

const countMaxIncrease = (list: number[]): number => {
  let acc = 0;
  list.map((v, idx) => {
    if (idx < list.length) {
      if (list[idx] < list[idx + 1]) {
        acc++;
      }
    }
  });
  return acc;
};

const part1 = () => {
  return countMaxIncrease(input.split("\n").map((e) => +e));
};

const part2 = () => {
  const list = input.split("\n").map((e) => +e);
  let acc: number[] = [];
  list.map((v, idx) => {
    if (idx < list.length + 2) {
      acc.push(list[idx] + list[idx + 1] + list[idx + 2]);
    }
  });
  return countMaxIncrease(acc);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
