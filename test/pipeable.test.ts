import sinon from 'sinon';
import { expect, it } from 'vitest';

import {
  append,
  concat,
  cycle,
  eachChunk,
  filter,
  first,
  forEach,
  from,
  last,
  map,
  prepend,
  reduce,
  reject,
  scan,
  seq,
  skip,
  skipUntil,
  skipWhile,
  take,
  takeUntil,
  takeWhile,
  zip,
  zipAll,
  zipWith,
} from '../src';

const arrayStrings = ['a', 'b', 'c', 'd'];
const arrayNums = [1, 2, 3, 4];
const mapNums = new Map([
  [1, 10],
  [2, 20],
  [3, 30],
  [4, 40],
]);

it('append', () => {
  const expectedResult = [1, 2, 3, 4, 'a', 'b', 'c', 'd'];
  const arrayNumsIt = from(arrayNums);
  expect([...arrayNumsIt.pipe(append('a', 'b', 'c', 'd'))]).toEqual(
    expectedResult
  );
});

it('concat', () => {
  const expectedResult = [1, 2, 3, 4, 'a', 'b', 'c', 'd'];
  const arrayNumsIt = from(arrayNums);
  const arrayStringsIt = from(arrayStrings);
  expect([...arrayNumsIt.pipe(concat(arrayStringsIt))]).toEqual(expectedResult);
});

it('cycle', () => {
  const expectedResult = [1, 2, 3, 4, 1, 2, 3, 4];
  const arrayNumsIt = from(arrayNums);
  expect([...arrayNumsIt.pipe(cycle(2))]).toEqual(expectedResult);
});

it('first', () => {
  const expectedResult = 'a';
  const arrayStringsIt = from(arrayStrings);
  expect([...arrayStringsIt.pipe(first())][0]).toEqual(expectedResult);
});

it('last', () => {
  const expectedResult = 'd';
  const arrayStringsIt = from(arrayStrings);

  expect([...arrayStringsIt.pipe(last())][0]).toEqual(expectedResult);
});

it('take', () => {
  const expectedResult = ['a', 'b'];
  const arrayStringsIt = from(arrayStrings);

  expect([...arrayStringsIt.pipe(take(2))]).toEqual(expectedResult);
});

it('take with offset', () => {
  const expectedResult = ['b', 'c'];
  const arrayStringsIt = from(arrayStrings);

  expect([...arrayStringsIt.pipe(take(2, 1))]).toEqual(expectedResult);
});

it('takeUntil', () => {
  const expectedResult = ['a', 'b'];
  const arrayStringsIt = from(arrayStrings);

  expect([...arrayStringsIt.pipe(takeUntil((x) => x === 'c'))]).toEqual(
    expectedResult
  );
});

it('takeWhile', () => {
  const expectedResult = [1, 2, 3];
  const arrayNumsIt = from(arrayNums);

  expect([...arrayNumsIt.pipe(takeWhile((x) => x < 4))]).toEqual(
    expectedResult
  );
});

it('skipUntil', () => {
  const expectedResult = ['c', 'd'];
  const arrayStringsIt = from(arrayStrings);

  expect([...arrayStringsIt.pipe(skipUntil((x) => x === 'c'))]).toEqual(
    expectedResult
  );
});

it('skipWhile', () => {
  const expectedResult = [3, 4];
  const arrayNumsIt = from(arrayNums);

  expect([...arrayNumsIt.pipe(skipWhile((x) => x < 3))]).toEqual(
    expectedResult
  );
});

it('skip', () => {
  const expectedResult = ['c', 'd'];
  const arrayStringsIt = from(arrayStrings);

  expect([...arrayStringsIt.pipe(skip(2))]).toEqual(expectedResult);
});

it('forEach', () => {
  const log = sinon.stub().returns((x) => x);

  const expectedResult = ['a', 'b', 'c', 'd'];
  const arrayStringsIt = from(arrayStrings);

  expect([...arrayStringsIt.pipe(forEach(log))]).toEqual(expectedResult);

  expect(log.callCount).toBe(arrayStrings.length);
  expect(log.calledWith('a')).toBe(true);
  expect(log.calledWith('b')).toBe(true);
  expect(log.calledWith('c')).toBe(true);
  expect(log.calledWith('d')).toBe(true);
});

it('eachChunk with even n chunks', () => {
  const log = sinon.stub().returns((x) => x);

  const expectedResult = ['a', 'b', 'c', 'd'];
  const arrayStringsIt = from(arrayStrings);

  expect([...arrayStringsIt.pipe(eachChunk(2, log))]).toEqual(expectedResult);

  expect(log.callCount).toBe(2);
  expect(log.calledWith('a', 'b')).toBe(true);
  expect(log.calledWith('c', 'd')).toBe(true);
});

it('eachChunk with odd n chunks', () => {
  const log = sinon.stub().returns((x) => x);

  const expectedResult = ['a', 'b', 'c', 'd'];
  const oddChunks = 3;
  const arrayStringsIt = from(arrayStrings);

  expect([...arrayStringsIt.pipe(eachChunk(oddChunks, log))]).toEqual(
    expectedResult
  );

  expect(log.callCount).toBe(2);
  expect(log.calledWith('a', 'b', 'c')).toBe(true);
  expect(log.calledWith('d')).toBe(true);
});

it('eachChunk with illegal chunk size throws error', () => {
  const log = sinon.stub().returns((x) => x);

  const n = -1;
  const expectedError = `Chunk size must be at least 1: ${n} given`;
  const arrayStringsIt = from(arrayStrings);

  expect(() => [...arrayStringsIt.pipe(eachChunk(n, log))]).toThrow(
    new RangeError(expectedError)
  );
});

it('seq', () => {
  const expectedResult = ['a', 'c'];
  const arrayStringsIt = from(arrayStrings);

  expect([...arrayStringsIt.pipe(seq(2))]).toEqual(expectedResult);
});

it('seq with offset', () => {
  const expectedResult = ['b', 'd'];
  const arrayStringsIt = from(arrayStrings);

  expect([...arrayStringsIt.pipe(seq(2, 1))]).toEqual(expectedResult);
});

it('map', () => {
  const expectedArrayResult = [3, 6, 9, 12];
  const expectedMapResult = [10, 40, 90, 160];
  const arrayNumsIt = from(arrayNums);
  const mapNumsIt = from(mapNums);

  expect([...arrayNumsIt.pipe(map((x) => x * 3))]).toEqual(expectedArrayResult);
  expect([...mapNumsIt.pipe(map(([k, v]) => k * v))]).toEqual(
    expectedMapResult
  );
});

it('filter', () => {
  const expectedResult = [1, 2, 3];
  const arrayNumsIt = from(arrayNums);

  expect([...arrayNumsIt.pipe(filter((x) => x < 4))]).toEqual(expectedResult);
});

it('prepend', () => {
  const expectedResult = ['a', 'b', 'c', 'd', 1, 2, 3, 4];
  const arrayNumsIt = from(arrayNums);
  expect([...arrayNumsIt.pipe(prepend('a', 'b', 'c', 'd'))]).toEqual(
    expectedResult
  );
});

it('reject', () => {
  const expectedResult = [3, 4];
  const arrayNumsIt = from(arrayNums);

  expect([...arrayNumsIt.pipe(reject((x) => x < 3))]).toEqual(expectedResult);
});

it('reduce', () => {
  const expectedResult = [10];
  const arrayNumsIt = from(arrayNums);

  expect([...arrayNumsIt.pipe(reduce((acc, x) => acc + x, 0))]).toEqual(
    expectedResult
  );
});

it('scan', () => {
  const expectedResult = [1, 3, 6, 10];
  const arrayNumsIt = from(arrayNums);

  expect([...arrayNumsIt.pipe(scan((acc, x) => acc + x, 0))]).toEqual(
    expectedResult
  );
});

it('zip', () => {
  const expectedResult = [
    ['a', 1],
    ['b', 2],
    ['c', 3],
    ['d', 4],
  ];
  const arrayStringsIt = from(arrayStrings);

  expect([...arrayStringsIt.pipe(zip(arrayNums))]).toEqual(expectedResult);
});

it('zipAll', () => {
  const expectedResult = [
    ['a', 1],
    ['b', 2],
    ['c', 3],
    ['d', 4],
    ['e', undefined],
  ];

  const arrayStringsIt = from(arrayStrings.concat('e'));

  expect([...arrayStringsIt.pipe(zipAll(arrayNums))]).toEqual(expectedResult);
});

it('zipWith', () => {
  const simpleResult = ['a1', 'b2', 'c3', 'd4'];
  const complexResult = ['a-2-1-10', 'b-4-2-20', 'c-6-3-30', 'd-8-4-40'];
  const arrayStringsIt = from(arrayStrings);

  expect([
    ...arrayStringsIt.pipe(zipWith((str, num) => str + num, arrayNums)),
  ]).toEqual(simpleResult);

  expect([
    ...arrayStringsIt.pipe(
      zipWith(
        (str, num, [ones, tens]) => `${str}-${num * 2}-${ones}-${tens}`,
        arrayNums,
        mapNums
      )
    ),
  ]).toEqual(complexResult);
});
