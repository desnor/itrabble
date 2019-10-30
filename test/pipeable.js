import test from 'ava'
import sinon from 'sinon'

import { from } from '../commonjs'
import { append } from '../commonjs/pipeable'
import { concat } from '../commonjs/pipeable'
import { first } from '../commonjs/pipeable'
import { eachChunk } from '../commonjs/pipeable'
import { filter } from '../commonjs/pipeable'
import { forEach } from '../commonjs/pipeable'
import { last } from '../commonjs/pipeable'
import { map } from '../commonjs/pipeable'
import { prepend } from '../commonjs/pipeable'
import { reduce } from '../commonjs/pipeable'
import { reject } from '../commonjs/pipeable'
import { scan } from '../commonjs/pipeable'
import { seq } from '../commonjs/pipeable'
import { skip } from '../commonjs/pipeable'
import { skipUntil } from '../commonjs/pipeable'
import { skipWhile } from '../commonjs/pipeable'
import { take } from '../commonjs/pipeable'
import { takeUntil } from '../commonjs/pipeable'
import { takeWhile } from '../commonjs/pipeable'
import { zip } from '../commonjs/pipeable'
import { zipAll } from '../commonjs/pipeable'
import { zipWith } from '../commonjs/pipeable'

import { toArray } from '../commonjs/pipeable'
import { toMap } from '../commonjs/pipeable'
import { toSet } from '../commonjs/pipeable'

const arrayStrings = ['a', 'b', 'c', 'd']
const arrayNums = [1, 2, 3, 4]
const mapStrings = new Map([['a', 'A'], ['b', 'B'], ['c', 'C']])
const mapNums = new Map([[1, 10], [2, 20], [3, 30], [4, 40]])

test('toArray', t => {
  const unwrapped = 'a'
  const wrapped = Array.from('a')
  const arrayStringsIt = from(arrayStrings)

  t.deepEqual(...arrayStringsIt.pipe(first()), unwrapped)
  t.deepEqual(arrayStringsIt.pipe(first(), toArray()), wrapped)
})

test('toMap', t => {
  const wrapped = new Map([['a', 'A']])
  const mapStringsItr = from(mapStrings)

  t.deepEqual(new Map(mapStringsItr.pipe(first())), wrapped)
  t.deepEqual(mapStringsItr.pipe(first(), toMap()), wrapped)
})

test('toSet', t => {
  const set = new Set(arrayStrings)
  const arrayStringsItr = from(arrayStrings)

  t.deepEqual(new Set(arrayStringsItr), set)
  t.deepEqual(arrayStringsItr.pipe(toSet()), set)
})

test('append', t => {
  const expectedResult = [1,2,3,4,'a','b','c','d']
  const arrayNumsIt = from(arrayNums)
  t.deepEqual([...arrayNumsIt.pipe(append('a','b','c','d'))], expectedResult)
})

test('concat', t => {
  const expectedResult = [1,2,3,4,'a','b','c','d']
  const arrayNumsIt = from(arrayNums)
  const arrayStringsIt = from(arrayStrings)
  t.deepEqual([...arrayNumsIt.pipe(concat(arrayStringsIt))], expectedResult)
})

test('first', t => {
  const expectedResult = 'a'
  const arrayStringsIt = from(arrayStrings)
  t.deepEqual(...arrayStringsIt.pipe(first()), expectedResult)
})

test('last', t => {
  const expectedResult = 'd'
  const arrayStringsIt = from(arrayStrings)

  t.deepEqual(...arrayStringsIt.pipe(last()), expectedResult)
})

test('take', t => {
  const expectedResult = ['a', 'b']
  const arrayStringsIt = from(arrayStrings)

  t.deepEqual([...arrayStringsIt.pipe(take(2))], expectedResult)
})

test('take with offset', t => {
  const expectedResult = ['b', 'c']
  const arrayStringsIt = from(arrayStrings)

  t.deepEqual([...arrayStringsIt.pipe(take(2, 1))], expectedResult)
})

test('takeUntil', t => {
  const expectedResult = ['a', 'b']
  const arrayStringsIt = from(arrayStrings)

  t.deepEqual(
    [...arrayStringsIt.pipe(takeUntil(x => x === 'c'))],
    expectedResult
    )
  })

  test('takeWhile', t => {
    const expectedResult = [1, 2, 3]
    const arrayNumsIt = from(arrayNums)

  t.deepEqual(
    [...arrayNumsIt.pipe(takeWhile(x => x < 4))],
    expectedResult
  )
})

test('skipUntil', t => {
  const expectedResult = ['c', 'd']
  const arrayStringsIt = from(arrayStrings)

  t.deepEqual(
    [...arrayStringsIt.pipe(skipUntil(x => x === 'c'))],
    expectedResult
  )
})

test('skipWhile', t => {
  const expectedResult = [3, 4]
  const arrayNumsIt = from(arrayNums)

  t.deepEqual(
    [...arrayNumsIt.pipe(skipWhile(x => x < 3))],
    expectedResult
  )
})

test('skip', t => {
  const expectedResult = ['c', 'd']
  const arrayStringsIt = from(arrayStrings)

  t.deepEqual([...arrayStringsIt.pipe(skip(2))], expectedResult)
})

test('forEach', t => {
  const log = sinon.stub().returns(x => x)
  const expectedResult = ['a', 'b', 'c', 'd']
  const arrayStringsIt = from(arrayStrings)

  t.deepEqual([...arrayStringsIt.pipe(forEach(log))], expectedResult)

  t.is(log.callCount, arrayStrings.length)
  t.is(log.calledWith('a'), true)
  t.is(log.calledWith('b'), true)
  t.is(log.calledWith('c'), true)
  t.is(log.calledWith('d'), true)
})

// /* ***** eachChunk/ ***** */
test('eachChunk with even n chunks', t => {
  const log = sinon.stub().returns(x => x)
  const expectedResult = ['a', 'b', 'c', 'd']
  const arrayStringsIt = from(arrayStrings)

  t.deepEqual([...arrayStringsIt.pipe(eachChunk(2, log))], expectedResult)

  t.is(log.callCount, 2)
  t.is(log.calledWith('a', 'b'), true)
  t.is(log.calledWith('c', 'd'), true)
})

test('eachChunk with odd n chunks', t => {
  const log = sinon.stub().returns(x => x)
  const expectedResult = ['a', 'b', 'c', 'd']
  const oddChunks = 3
  const arrayStringsIt = from(arrayStrings)

  t.deepEqual([...arrayStringsIt.pipe(eachChunk(oddChunks, log))], expectedResult)

  t.is(log.callCount, 2)
  t.is(log.calledWith('a', 'b', 'c'), true)
  t.is(log.calledWith('d'), true)
})

test('eachChunk with illegal chunk size throws error', t => {
  const log = sinon.stub().returns(x => x)
  const n = -1
  const expectedError = `Chunk size must be at least 1: ${n} given`
  const arrayStringsIt = from(arrayStrings)

  const error = t.throws(() => [...arrayStringsIt.pipe(eachChunk(n, log))], RangeError)

  t.is(error.message, expectedError)
})

test('seq', t => {
  const expectedResult = ['a', 'c']
  const arrayStringsIt = from(arrayStrings)

  t.deepEqual([...arrayStringsIt.pipe(seq(2))], expectedResult)
})

test('seq with offset', t => {
  const expectedResult = ['b', 'd']
  const arrayStringsIt = from(arrayStrings)

  t.deepEqual([...arrayStringsIt.pipe(seq(2, 1))], expectedResult)
})

test('map', t => {
  const expectedArrayResult = [3, 6, 9, 12]
  const expectedMapResult = [10, 40, 90, 160]
  const arrayNumsIt = from(arrayNums)
  const mapNumsIt = from(mapNums)

  t.deepEqual([...arrayNumsIt.pipe(map(x => x * 3))], expectedArrayResult)
  t.deepEqual([...mapNumsIt.pipe(map(([k, v]) => k * v))], expectedMapResult)
})

test('filter', t => {
  const expectedResult = [1, 2, 3]
  const arrayNumsIt = from(arrayNums)

  t.deepEqual([...arrayNumsIt.pipe(filter(x => x < 4))], expectedResult)
})

test('prepend', t => {
  const expectedResult = ['a', 'b', 'c', 'd', 1, 2, 3, 4]
  const arrayNumsIt = from(arrayNums)
  t.deepEqual([...arrayNumsIt.pipe(prepend('a', 'b', 'c', 'd'))], expectedResult)
})

test('reject', t => {
  const expectedResult = [3, 4]
  const arrayNumsIt = from(arrayNums)

  t.deepEqual([...arrayNumsIt.pipe(reject(x => x < 3))], expectedResult)
})

test('reduce', t => {
  const expectedResult = [10]
  const arrayNumsIt = from(arrayNums)

  t.deepEqual(
    [...arrayNumsIt.pipe(reduce((acc, x) => acc + x, 0))],
    expectedResult
  )
})

test('scan', t => {
  const expectedResult = [1, 3, 6, 10]
  const arrayNumsIt = from(arrayNums)

  t.deepEqual(
    [...arrayNumsIt.pipe(scan((acc, x) => acc + x, 0))],
    expectedResult
  )
})

test('zip', t => {
  const expectedResult = [['a', 1], ['b', 2], ['c', 3], ['d', 4]]
  const arrayStringsIt = from(arrayStrings)

  t.deepEqual(
    [...arrayStringsIt.pipe(zip(arrayNums))],
    expectedResult
  )
})

test('zipAll', t => {
  const expectedResult = [['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', undefined]]
  const arrayStringsIt = from(arrayStrings.concat(['e']))

  t.deepEqual(
    [...arrayStringsIt.pipe(zipAll(arrayNums))],
    expectedResult
  )
})

test('zipWith', t => {
  const simpleResult = ['a1', 'b2', 'c3', 'd4']
  const complexResult = ['a-2-1-10', 'b-4-2-20', 'c-6-3-30', 'd-8-4-40']
  const arrayStringsIt = from(arrayStrings)

  t.deepEqual(
    [...arrayStringsIt.pipe(zipWith((str, num) => str + num, arrayNums))],
    simpleResult
  )
  t.deepEqual(
    [...arrayStringsIt.pipe(zipWith((str, num, [ones, tens]) => `${str}-${num * 2}-${ones}-${tens}`, arrayNums, mapNums))],
    complexResult
  )
})
