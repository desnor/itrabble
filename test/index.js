import test from 'ava'
import sinon from 'sinon'
import { of, from } from '../lib/index.js'

const arrayStrings = ['a','b','c','d']
const arrayNums = [1,2,3,4]
const mapStrings = new Map ([['a', 'A'],['b','B'],['c','C']])
const mapNums = new Map([[1, 10],[2, 20],[3, 30],[4, 40]])

const arrayStringsIt = from(arrayStrings)
const arrayNumsIt = from(arrayNums)
const mapStringsIt = from(mapStrings)
const mapNumsIt = from(mapNums)

test('from', t => {
  const itrabble = from([1,2,3])
  const nums = [...itrabble.toArray()]

  t.deepEqual(nums, [1,2,3])
})

test('of', t => {
  const itrabble = of(1,2,3)
  const nums = [...itrabble.toArray()]

  t.deepEqual(nums, [1,2,3])
})

test('toArray', t => {
  const unwrapped = 'a'
  const wrapped = Array.from('a')

  t.deepEqual(...arrayStringsIt.first(), unwrapped)
  t.deepEqual(arrayStringsIt.first().toArray(), wrapped)
})

test('toMap', t => {
  const wrapped = new Map ([['a', 'A'],['b','B']])
  t.deepEqual(new Map(mapStringsIt.take(2)), wrapped)
  t.deepEqual(mapStringsIt.take(2).toMap(), wrapped)
  t.deepEqual(mapStringsIt.toMap(map => map.take(2)), wrapped)
})

test('toSet', t => {
  const set = new Set(arrayStrings)

  t.deepEqual(new Set(arrayStringsIt), set)
  t.deepEqual(arrayStringsIt.toSet(), set)
})

test('first', t => {
  const expectedResult = 'a'

  t.deepEqual(...arrayStringsIt.first(), expectedResult)
})

test('last', t => {
  const expectedResult = 'd'

  t.deepEqual(...arrayStringsIt.last(), expectedResult)
})

test('takeUntil', t => {
  const expectedResult = ['a','b']

  t.deepEqual(
    [...arrayStringsIt.takeUntil(x => x === 'c')],
    expectedResult
  )
})

test('takeWhile', t => {
  const expectedResult = [1,2,3]

  t.deepEqual(
    [...arrayNumsIt.takeWhile(x => x < 4)],
    expectedResult
  )
})

test('take', t => {
  const expectedResult = ['a','b']

  t.deepEqual([...arrayStringsIt.take(2)], expectedResult)
})

test('take with offset', t => {
  const expectedResult = ['b','c']

  t.deepEqual([...arrayStringsIt.take(2, 1)], expectedResult)
})

test('skipUntil', t => {
  const expectedResult = ['c','d']

  t.deepEqual(
    [...arrayStringsIt.skipUntil(x => x === 'c')],
    expectedResult
  )
})

test('skipWhile', t => {
  const expectedResult = [3,4]

  t.deepEqual(
    [...arrayNumsIt.skipWhile(x => x < 3)],
    expectedResult
  )
})

test('skip', t => {
  const expectedResult = ['c','d']

  t.deepEqual([...arrayStringsIt.skip(2)], expectedResult)
})

test('forEach', t => {
  const log = sinon.stub().returns(x => x)
  const expectedResult = ['a','b','c','d']

  t.deepEqual([...arrayStringsIt.forEach(log)], expectedResult)

  t.is(log.callCount, arrayStrings.length)
  t.is(log.calledWith('a'), true)
  t.is(log.calledWith('b'), true)
  t.is(log.calledWith('c'), true)
  t.is(log.calledWith('d'), true)
})

/* ***** eachChunk/ ***** */
test('eachChunk with even n chunks', t => {
  const log = sinon.stub().returns(x => x)
  const expectedResult = ['a','b','c','d']

  t.deepEqual([...arrayStringsIt.eachChunk(2, log)], expectedResult)

  t.is(log.callCount, 2)
  t.is(log.calledWith('a','b'), true)
  t.is(log.calledWith('c','d'), true)
})

test('eachChunk with odd n chunks', t => {
  const log = sinon.stub().returns(x => x)
  const expectedResult = ['a','b','c','d']
  const oddChunks = 3

  t.deepEqual([...arrayStringsIt.eachChunk(oddChunks, log)], expectedResult)

  t.is(log.callCount, 2)
  t.is(log.calledWith('a','b','c'), true)
  t.is(log.calledWith('d'), true)
})

test('eachChunk with illegal chunk size throws error', t => {
  const log = sinon.stub().returns(x => x)
  const n = -1
  const expectedError = `Chunk size must be at least 1: ${n} given`

  const error = t.throws(() => [...arrayStringsIt.eachChunk(n, log)], RangeError)

  t.is(error.message, expectedError)
})

test('seq', t => {
  const expectedResult = ['a','c']

  t.deepEqual([...arrayStringsIt.seq(2)], expectedResult)
})

test('seq with offset', t => {
  const expectedResult = ['b','d']

  t.deepEqual([...arrayStringsIt.seq(2, 1)], expectedResult)
})

test('map', t => {
  const expectedArrayResult = [3,6,9,12]
  const expectedMapResult = [10,40,90,160]

  t.deepEqual([...arrayNumsIt.map(x => x * 3)], expectedArrayResult)
  t.deepEqual([...mapNumsIt.map(([k, v]) => k * v)], expectedMapResult)
})

test('filter', t => {
  const expectedResult = [1,2,3]

  t.deepEqual([...arrayNumsIt.filter(x => x < 4)], expectedResult)
})

test('reject', t => {
  const expectedResult = [3,4]

  t.deepEqual([...arrayNumsIt.reject(x => x < 3)], expectedResult)
})

test('reduce', t => {
  const expectedResult = [10]

  t.deepEqual(
    [...arrayNumsIt.reduce((acc, x) => acc + x, 0)],
    expectedResult
  )
})

test('scan', t => {
  const expectedResult = [1,3,6,10]

  t.deepEqual(
    [...arrayNumsIt.scan((acc, x) => acc + x, 0)],
    expectedResult
  )
})

test('zip', t => {
  const expectedResult = [['a',1],['b',2],['c',3],['d',4]]
  t.deepEqual(
    [...arrayStringsIt.zip(arrayNums)],
    expectedResult
  )
})

test('zipAll', t => {
  const expectedResult = [['a',1],['b',2],['c',3],['d', 4],['e', undefined]]
  const extendedInput = from(arrayStrings.concat('e'))

  t.deepEqual(
    [...extendedInput.zipAll(arrayNums)],
    expectedResult
  )
})

test('zipWith', t => {
  const simpleResult = ['a1','b2','c3','d4']
  const complexResult = ['a-2-1-10','b-4-2-20','c-6-3-30','d-8-4-40']

  t.deepEqual(
    [...arrayStringsIt.zipWith((str,num) => str + num, arrayNums)],
    simpleResult
  )
  t.deepEqual(
    [...arrayStringsIt.zipWith((str, num, [ones, tens]) => `${str}-${num * 2}-${ones}-${tens}`, arrayNums, mapNums)],
    complexResult
  )
})
