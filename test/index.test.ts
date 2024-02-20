import { describe, expect, it } from 'vitest';
import { from, of } from '../src/';

const arrayStrings = ['a', 'b', 'c', 'd'];
const mapStrings = new Map([
  ['a', 'A'],
  ['b', 'B'],
  ['c', 'C'],
]);

const arrayStringsIt = from(arrayStrings);
const mapStringsIt = from(mapStrings);

describe('from', () => {
  describe('with instance of Itrabble as param', () => {
    it('returns instance', () => {
      const original = from([1, 2, 3]);
      const nums = from(original);

      expect(nums).toBe(original);
    });
  });
  describe('with other input as param', () => {
    it('returns itrabble of input', () => {
      const itrabble = from([1, 2, 3]);
      const nums = itrabble.toArray;

      expect(nums).toEqual([1, 2, 3]);
    });
  });
});

it('of', () => {
  const itrabble = of(1, 2, 3);
  const nums = itrabble.toArray;

  expect(nums).toEqual([1, 2, 3]);
});

it('toArray', () => {
  const unwrapped = 'a';

  expect(arrayStringsIt.first).toEqual(unwrapped);
});

it('toMap', () => {
  const resultMap = mapStringsIt.toMap;

  expect(resultMap).toEqual(new Map(mapStringsIt));
});

it('toSet', () => {
  const set = new Set(arrayStrings);

  expect(new Set(arrayStringsIt)).toEqual(set);
  expect(arrayStringsIt.toSet).toEqual(set);
});

it('first', () => {
  const expectedResult = 'a';

  expect(arrayStringsIt.first).toEqual(expectedResult);
});

it('last', () => {
  const expectedResult = 'd';

  expect(arrayStringsIt.last).toEqual(expectedResult);
});
