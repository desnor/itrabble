const test = require('ava')
const sinon = require('sinon')

require('./lib/object-prototype-decorator')

const arrayStrings = ['a','b','c','d']
const arrayNums = [1,2,3,4]
const mapStrings = new Map ([['a', 'A'],['b','B'],['c','C']])
const mapNums = new Map([[1, 10],[2, 20],[3, 30],[4, 40]])

test('toArray', t => {
  const unwrapped = 'a'
  const wrapped = Array.from('a')

  t.deepEqual(...arrayStrings.itrabble.first(), unwrapped)
  t.deepEqual(arrayStrings.itrabble.first().toArray(), wrapped)
})

test('toMap', t => {
  const wrapped = new Map ([['a', 'A'],['b','B']])
  t.deepEqual(new Map(mapStrings.itrabble.take(2)), wrapped)
  t.deepEqual(mapStrings.itrabble.take(2).toMap(), wrapped)
  t.deepEqual(mapStrings.itrabble.toMap(map => map.take(2)), wrapped)
})

test('toSet', t => {
  const set = new Set(arrayStrings)

  t.deepEqual(new Set(arrayStrings.itrabble), set)
  t.deepEqual(arrayStrings.itrabble.toSet(), set)
})

test('first', t => {
  const expectedResult = 'a'

  t.deepEqual(...arrayStrings.itrabble.first(), expectedResult)
})

test('last', t => {
  const expectedResult = 'd'

  t.deepEqual(...arrayStrings.itrabble.last(), expectedResult)
})

test('takeUntil', t => {
  const expectedResult = ['a','b']

  t.deepEqual(
    [...arrayStrings.itrabble.takeUntil(x => x === 'c')],
    expectedResult
  )
})

test('takeWhile', t => {
  const expectedResult = [1,2,3]

  t.deepEqual(
    [...arrayNums.itrabble.takeWhile(x => x < 4)],
    expectedResult
  )
})

test('take', t => {
  const expectedResult = ['a','b']

  t.deepEqual([...arrayStrings.itrabble.take(2)], expectedResult)
})

test('take with offset', t => {
  const expectedResult = ['b','c']

  t.deepEqual([...arrayStrings.itrabble.take(2, 1)], expectedResult)
})

test('skipUntil', t => {
  const expectedResult = ['c','d']

  t.deepEqual(
    [...arrayStrings.itrabble.skipUntil(x => x === 'c')],
    expectedResult
  )
})

test('skipWhile', t => {
  const expectedResult = [3,4]

  t.deepEqual(
    [...arrayNums.itrabble.skipWhile(x => x < 3)],
    expectedResult
  )
})

test('skip', t => {
  const expectedResult = ['c','d']

  t.deepEqual([...arrayStrings.itrabble.skip(2)], expectedResult)
})

test('forEach', t => {
  const log = sinon.stub().returns(x => x)
  const expectedResult = ['a','b','c','d']

  t.deepEqual([...arrayStrings.itrabble.forEach(log)], expectedResult)

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

  t.deepEqual([...arrayStrings.itrabble.eachChunk(2, log)], expectedResult)

  t.is(log.callCount, 2)
  t.is(log.calledWith('a','b'), true)
  t.is(log.calledWith('c','d'), true)
})

test('eachChunk with odd n chunks', t => {
  const log = sinon.stub().returns(x => x)
  const expectedResult = ['a','b','c','d']
  const oddChunks = 3

  t.deepEqual([...arrayStrings.itrabble.eachChunk(oddChunks, log)], expectedResult)

  t.is(log.callCount, 2)
  t.is(log.calledWith('a','b','c'), true)
  t.is(log.calledWith('d'), true)
})

test('eachChunk with illegal chunk size throws error', t => {
  const log = sinon.stub().returns(x => x)
  const n = -1
  const expectedError = `Chunk size must be at least 1: ${n} given`

  const error = t.throws(() => [...arrayStrings.itrabble.eachChunk(n, log)], RangeError)

  t.is(error.message, expectedError)
})

test('seq', t => {
  const expectedResult = ['a','c']

  t.deepEqual([...arrayStrings.itrabble.seq(2)], expectedResult)
})

test('seq with offset', t => {
  const expectedResult = ['b','d']

  t.deepEqual([...arrayStrings.itrabble.seq(2, 1)], expectedResult)
})

test('map', t => {
  const expectedArrayResult = [3,6,9,12]
  const expectedMapResult = [10,40,90,160]

  t.deepEqual([...arrayNums.itrabble.map(x => x * 3)], expectedArrayResult)
  t.deepEqual([...mapNums.itrabble.map(([k, v]) => k * v)], expectedMapResult)
})

test('filter', t => {
  const expectedResult = [1,2,3]

  t.deepEqual([...arrayNums.itrabble.filter(x => x < 4)], expectedResult)
})

test('reject', t => {
  const expectedResult = [3,4]

  t.deepEqual([...arrayNums.itrabble.reject(x => x < 3)], expectedResult)
})

test('reduce', t => {
  const expectedResult = [10]

  t.deepEqual(
    [...arrayNums.itrabble.reduce((acc, x) => acc + x, 0)],
    expectedResult
  )
})

test('scan', t => {
  const expectedResult = [1,3,6,10]

  t.deepEqual(
    [...arrayNums.itrabble.scan((acc, x) => acc + x, 0)],
    expectedResult
  )
})

test('zip', t => {
  const expectedResult = [['a',1],['b',2],['c',3],['d',4]]
  t.deepEqual(
    [...arrayStrings.itrabble.zip(arrayNums)],
    expectedResult
  )
})

test('zipAll', t => {
  const expectedResult = [['a',1],['b',2],['c',3],['d', 4],['e', undefined]]

  t.deepEqual(
    [...arrayStrings.concat('e').itrabble.zipAll(arrayNums)],
    expectedResult
  )
})

test('zipWith', t => {
  const simpleResult = ['a1','b2','c3','d4']
  const complexResult = ['a-2-1-10','b-4-2-20','c-6-3-30','d-8-4-40']

  t.deepEqual(
    [...arrayStrings.itrabble.zipWith((str,num) => str + num, arrayNums)],
    simpleResult
  )
  t.deepEqual(
    [...arrayStrings.itrabble.zipWith((str, num, [ones, tens]) => `${str}-${num * 2}-${ones}-${tens}`, arrayNums, mapNums)],
    complexResult
  )
})
