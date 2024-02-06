import test from 'ava';
import { from, of } from '../dist/index.js';

const arrayStrings = ['a', 'b', 'c', 'd'];
const mapStrings = new Map([
  ['a', 'A'],
  ['b', 'B'],
  ['c', 'C'],
]);

const arrayStringsIt = from(arrayStrings);
const mapStringsIt = from(mapStrings);

test('from', (t) => {
  const itrabble = from([1, 2, 3]);
  const nums = itrabble.toArray;

  t.deepEqual(nums, [1, 2, 3]);
});

test('of', (t) => {
  const itrabble = of(1, 2, 3);
  const nums = itrabble.toArray;

  t.deepEqual(nums, [1, 2, 3]);
});

test('toArray', (t) => {
  const unwrapped = 'a';

  t.deepEqual(arrayStringsIt.first, unwrapped);
});

test('toMap', (t) => {
  const resultMap = mapStringsIt.toMap;

  t.deepEqual(resultMap, new Map(mapStrings));
});

test('toSet', (t) => {
  const set = new Set(arrayStrings);

  t.deepEqual(new Set(arrayStringsIt), set);
  t.deepEqual(arrayStringsIt.toSet, set);
});

test('first', (t) => {
  const expectedResult = 'a';

  t.deepEqual(arrayStringsIt.first, expectedResult);
});

test('last', (t) => {
  const expectedResult = 'd';

  t.deepEqual(arrayStringsIt.last, expectedResult);
});


