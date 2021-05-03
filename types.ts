import { from } from "itrabble";
import { filter, toArray } from "itrabble/pipeable";

const a = from([1, 2, 3, 4, 5])
  .filter((x) => x === 3)
  .toArray();
console.log("a is:", a);

const b = from(
  new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
    ["d", 4],
    ["e", 5],
  ])
)
  .filter(([_l, x]) => x === 3)
  .toArray();
console.log("b is:", b);

const c = from({ a: 1, b: 2, c: 3, d: 4, e: 5 })
  .filter(([_l, x]) => x === 3)
  .toMap();
console.log("c is:", c);

const d = from([1, 2, 3, 4, 5]).pipe(
  filter((x) => x === 3),
  toArray()
);
console.log("d is:", d);
