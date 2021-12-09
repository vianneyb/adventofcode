import { exit } from "process";
import getInput from "../../../utils/getInput";

const part1 = () => {};

const part2 = () => {};

class Board {
  private board: Array<Array<string>>;
  public winned = false;
  constructor(board: string) {
    this.board = board.split("\n").map((l) => l.trim().split(/\s+/));
  }

  pick(n: string) {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (this.board[i][j] === n) {
          this.board[i][j] = "x";
        }
      }
    }
  }

  sum() {
    let total = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (this.board[i][j] !== "x") {
          total += +this.board[i][j];
        }
      }
    }
    return total;
  }

  check() {
    let win = false;
    for (let i = 0; i < 5; i++) {
      const w =
        this.board[i][0] === "x" &&
        this.board[i][1] === "x" &&
        this.board[i][2] === "x" &&
        this.board[i][3] === "x" &&
        this.board[i][4] === "x";
      if (w) {
        this.winned = true;
        return w;
      }
    }
    for (let i = 0; i < 5; i++) {
      const w =
        this.board[0][i] === "x" &&
        this.board[1][i] === "x" &&
        this.board[2][i] === "x" &&
        this.board[3][i] === "x" &&
        this.board[4][i] === "x";
      if (w) {
        this.winned = true;
        return w;
      }
    }

    const w1 =
      this.board[0][0] === "x" &&
      this.board[1][1] === "x" &&
      this.board[2][2] === "x" &&
      this.board[3][3] === "x" &&
      this.board[4][4] === "x";
    if (w1) {
      this.winned = true;
      return w1;
    }
    const w2 =
      this.board[0][4] === "x" &&
      this.board[1][3] === "x" &&
      this.board[2][2] === "x" &&
      this.board[3][1] === "x" &&
      this.board[4][0] === "x";
    if (w2) {
      this.winned = true;
      return w2;
    }
    return false;
  }

  print() {
    console.log(this.board);
  }
}

const input = getInput("2021", "4").split("\n");
const draws = input[0].split(",");
const boards: Board[] = [];

// console.log((input.length - 2) / 6);

for (let i = 0; i < (input.length - 1) / 6 - 1; i++) {
  boards.push(
    new Board(
      input[i * (5 + 1) + 2] +
        "\n" +
        input[i * (5 + 1) + 3] +
        "\n" +
        input[i * (5 + 1) + 4] +
        "\n" +
        input[i * (5 + 1) + 5] +
        "\n" +
        input[i * (5 + 1) + 6]
    )
  );
}

// const play = () => {
//   for (let t of draws) {
//     for (let board of boards) {
//       board.pick(t);
//       if (board.check()) {
//         board.print();
//         console.log(t, board.sum(), +t * board.sum());
//         return;
//       }
//     }
//   }
// };
// play();

let lastBoard: Board = new Board(`x x x x x
x x x x x
x x x x x
x x x x x
x x x x x`);
let lastT;
const play = () => {
  for (let t of draws) {
    for (let board of boards) {
      if (board.winned) {
        continue;
      }
      board.pick(t);
      if (board.check()) {
        lastBoard = board;
        lastT = t;
      }
    }
  }
};
play();
if (lastBoard && lastT) {
  console.log(lastT, lastBoard.sum(), +lastT * lastBoard.sum());
}

const b = new Board(`44 51 57 75 19
33 54 24 96  1
30  0 45 47 38
58 78 17 74 14
91 60 32 67 10`);
// b.pick("19");
// b.pick("96");
// b.pick("45");
// b.pick("78");
// b.pick("91");
// b.print();
// console.log(b.check());

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
