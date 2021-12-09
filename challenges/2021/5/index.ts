import getInput from "../../../utils/getInput";

const input = getInput("2021", "5")
  // const input = `0,9 -> 5,9
  //   8,0 -> 0,8
  //   9,4 -> 3,4
  //   2,2 -> 2,1
  //   7,0 -> 7,4
  //   6,4 -> 2,0
  //   0,9 -> 2,9
  //   3,4 -> 1,4
  //   0,0 -> 8,8
  //   5,5 -> 8,2`
  .split("\n")
  .map((l) => {
    const parts = /(\d+),(\d+) -> (\d+),(\d+)/g.exec(l);
    if (parts) {
      return [+parts[1], +parts[2], +parts[3], +parts[4]];
    }
    return [];
  });

class Board {
  private board: Array<Array<number>> = [];
  public winned = false;
  private size: number = 0;
  constructor(n: number) {
    this.size = n;
    for (let i = 0; i < n; i++) {
      this.board[i] = [];
      for (let j = 0; j < n; j++) {
        this.board[i][j] = 0;
      }
    }
  }
  print() {
    let str = "";
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        str += " " + (this.board[i][j] == 0 ? "." : this.board[i][j]);
      }
      str += "\n";
    }
    console.log(str);
  }

  mark(x: number, y: number) {
    this.board[y][x] += 1;
  }

  count() {
    let nb = 0;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        nb += this.board[i][j] > 1 ? 1 : 0;
      }
    }
    return nb;
  }
}
const b = new Board(1000);

for (let i of input) {
  const [x1, y1, x2, y2] = i;
  if (x1 === x2) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      b.mark(x1, y);
    }
  } else if (y1 === y2) {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      b.mark(x, y1);
    }
  } else {
    const vector = [x2 - x1 > 0 ? 1 : -1, y2 - y1 > 0 ? 1 : -1];
    const step = Math.abs(y1 - y2);
    let x = x1;
    let y = y1;
    for (let s = 0; s <= step; s++) {
      b.mark(x, y);
      x += vector[0];
      y += vector[1];
    }
  }
}
// b.print();

const part1 = () => {};

const part2 = () => {};

console.log(`Solution 1: ${b.count()}`);
console.log(`Solution 2: ${part2()}`);
