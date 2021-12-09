import getInput from "../../../utils/getInput";

const input = getInput("2021", "2");

// const input = `forward 5
// down 5
// forward 8
// up 3
// down 8
// forward 2`;

const part1 = () => {
  let depth = 0;
  let position = 0;

  for (const command of input.split("\n")) {
    const [direction, amount] = command.split(" ");
    // console.log(direction, amount);
    switch (direction) {
      case "down":
        depth += +amount;
        break;
      case "up":
        depth -= +amount;
        break;
      case "forward":
        position += +amount;
        break;
      default:
        break;
    }
  }
  console.log(depth, position, depth * position);
};

const part2 = () => {
  let depth = 0;
  let position = 0;
  let aim = 0;

  for (const command of input.split("\n")) {
    const [direction, amount] = command.split(" ");
    // console.log(direction, amount);
    switch (direction) {
      case "down":
        aim += +amount;
        break;
      case "up":
        aim -= +amount;
        break;
      case "forward":
        position += +amount;
        depth += aim * +amount;
        break;
      default:
        break;
    }
  }
  console.log(depth, position, depth * position);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
