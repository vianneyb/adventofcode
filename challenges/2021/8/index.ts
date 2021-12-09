import getInput from "../../../utils/getInput";

class Mask {
  public available = [
    ["a", "b", "c", "d", "e", "f", "g"],
    ["a", "b", "c", "d", "e", "f", "g"],
    ["a", "b", "c", "d", "e", "f", "g"],
    ["a", "b", "c", "d", "e", "f", "g"],
    ["a", "b", "c", "d", "e", "f", "g"],
    ["a", "b", "c", "d", "e", "f", "g"],
    ["a", "b", "c", "d", "e", "f", "g"],
  ];
  public mask: string;
  public len: number;
  public val: number;
  constructor(mask: string, val: number) {
    this.mask = mask;
    this.val = val;
    this.len = this.mask.replaceAll(".", "").length;
  }
  regex() {
    return new RegExp(
      this.available.map((cable) => "[" + cable.join("") + "]").join("")
    );
  }

  reduce(digit: string, mask: Mask) {
    const newMask = new Mask(this.mask, this.val);
    newMask.available = [...this.available];
    for (let idx = 0; idx < mask.mask.length; idx++) {
      if (mask.mask[idx] == "x") {
        newMask.available[idx] = newMask.available[idx].filter((value) =>
          digit.split("").includes(value)
        );
      }
    }
    return newMask;
  }
}

const maskDict: Mask[] = [
  new Mask("xxx.xxx", 0),
  new Mask("..x..x.", 1),
  new Mask("x.xxx.x", 2),
  new Mask("x.xx.xx", 3),
  new Mask(".xxx.x.", 4),
  new Mask("xx.x.xx", 5),
  new Mask("xx.xxxx", 6),
  new Mask("x.x..x.", 7),
  new Mask("xxxxxxx", 8),
  new Mask("xxxx.xx", 9),
];

const part1 = () => {};

const part2 = () => {};

const input = getInput("2021", "8")
  //   `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
  //       edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
  //       fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
  //       fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
  //       aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
  //       fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
  //       dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
  //       bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
  //       egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
  //       gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`
  .split("\n")
  .map((l) => {
    const parts = l.match(/(\w+)/g);
    if (!parts) {
      return { patterns: [], output: [] };
    }
    const patterns = [];
    const output = [parts[10], parts[11], parts[12], parts[13]];
    for (let i = 0; i < 10; i++) {
      patterns.push(parts[i]);
    }

    return { patterns, output };
  });

const candidates = stringPermutations("abcdefg");

let nb = 0;
let nb2 = 0;
for (const l of input) {
  const mask = applyDigits(l.patterns, candidates, maskDict);

  const list = l.output.reduce((acc, digit) => {
    let corresp = maskDict.filter((m) => m.mask == transform(digit, mask[0]));
    if (!corresp.length) {
      corresp = maskDict.filter((m) => m.mask == transform(digit, mask[1]));
    }

    acc += "" + corresp[0].val;

    // part 1
    if (
      digit.length == 7 ||
      digit.length == 4 ||
      digit.length == 3 ||
      digit.length == 2
    ) {
      nb++;
    }
    return acc;
  }, <string>"");

  nb2 += +list;
  //   console.log({ list });
}

console.log({ nb, nb2 });

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);

function applyDigitToCandidates(
  digit: string,
  candidates: string[],
  regex: RegExp
): string[] {
  // je filtre les candidats avec ces masks
  const filteredCandidates = candidates.reduce(
    (filteredCandidates, candidate) => {
      if (regex.exec(candidate)) {
        filteredCandidates.push(candidate);
      }
      return filteredCandidates;
    },
    <string[]>[]
  );

  return filteredCandidates;
}

function applyDigits(
  digits: string[],
  candidates: string[],
  masks: Mask[]
): string[] {
  if (candidates.length == 0) {
    return [];
  }
  if (candidates.length == 1 && digits.length == 0) {
    return candidates;
  }
  if (digits.length == 0) {
    // console.log(candidates);
    return candidates;
  }
  const digit = digits[0];
  for (let idx = 0; idx < masks.length; idx++) {
    const mask = masks[idx];
    if (mask.len == digit.length) {
      //   console.log({ mask, m: mask.regex() });
      //   apply mask regex

      const filteredCandidates = applyDigitToCandidates(
        digit,
        candidates,
        mask.regex()
      );
      // reduce possibility for next iteration
      let newMasks = masks.map((m) => m.reduce(digit, mask));
      const found = applyDigits(digits.slice(1), filteredCandidates, newMasks);
      if (found.length) {
        return found;
      }
    }
  }

  return [];
}

function transform(digit: string, mapping: string) {
  return mapping
    .split("")
    .map((m) => (digit.split("").includes(m) ? "x" : "."))
    .join("");
}

function stringPermutations(str: string): string[] {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split("")
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            (val) => letter + val
          )
        ),
      <string[]>[]
    );
}
