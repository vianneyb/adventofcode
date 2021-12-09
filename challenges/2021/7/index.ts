import getInput from "../../../utils/getInput";

const part1 = () => {};

const part2 = () => {};

const input =
  // "16,1,2,0,4,2,7,1,2,14" // 0
  getInput("2021", "7")
    .split(",")
    .map((v) => +v);

function average(nums: number[]) {
  return nums.reduce((a, b) => a + b) / nums.length;
}

function sum(nums: number[]) {
  return nums.reduce((a, b) => a + b);
}

function sum_arit_n(n: number) {
  return n == 0 ? 0 : (n * (n + 1)) / 2;
}

const median = (arr: number[]) => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

let avg = Math.floor(average(input));
// avg = 2;

const distance = input.reduce((acc, v) => {
  acc.push(sum_arit_n(Math.abs(v - avg)));
  return acc;
}, <number[]>[]);

// console.log(input, median(input), distance, sum(distance));

console.log(input, avg, distance, sum(distance));

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
