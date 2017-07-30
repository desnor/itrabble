const test = require('ava')

require('./itrabble')

let arrayStrings = ['a','b','c','d']
let arrayNums = [1,2,3,4]

test('first', t => {
  const expectedResult = ['a']

  t.deepEqual(arrayStrings.itrabble.first().toArray(), expectedResult)
})

test('last', t => {
  const expectedResult = ['d']

  t.deepEqual(arrayStrings.itrabble.last().toArray(), expectedResult)
})

test('takeUntil', t => {
  const expectedResult = ['a','b']

  t.deepEqual(arrayStrings.itrabble.takeUntil(x => x === 'c').toArray(), expectedResult)
})

test('takeWhile', t => {
  const expectedResult = [1,2,3]

  t.deepEqual(arrayNums.itrabble.takeWhile(x => x < 4).toArray(), expectedResult)
})

test('take', t => {
  const expectedResult = ['a','b']

  t.deepEqual(arrayStrings.itrabble.take(2).toArray(), expectedResult)
})

test('skipUntil', t => {
  const expectedResult = ['c','d']

  t.deepEqual(arrayStrings.itrabble.skipUntil(x => x === 'c').toArray(), expectedResult)
})

test('skipWhile', t => {
  const expectedResult = [3,4]

  t.deepEqual(arrayNums.itrabble.skipWhile(x => x < 3).toArray(), expectedResult)
})

test('skip', t => {
  const expectedResult = ['c','d']

  t.deepEqual(arrayStrings.itrabble.skip(2).toArray(), expectedResult)
})

test('every', t => {
  const expectedResult = ['a','c']

  t.deepEqual(arrayStrings.itrabble.every(2).toArray(), expectedResult)
})

test('every with offset', t => {
  const expectedResult = ['b','d']

  t.deepEqual(arrayStrings.itrabble.every(2, 1).toArray(), expectedResult)
})

test('map', t => {
  const expectedResult = [3,6,9,12]

  t.deepEqual(arrayNums.itrabble.map(x => x * 3).toArray(), expectedResult)
})

test('filter', t => {
  const expectedResult = [1,2,3]

  t.deepEqual(arrayNums.itrabble.filter(x => x < 4).toArray(), expectedResult)
})

test('reject', t => {
  const expectedResult = [3,4]

  t.deepEqual(arrayNums.itrabble.reject(x => x < 3).toArray(), expectedResult)
})

test('reduce', t => {
  const expectedResult = [10]

  t.deepEqual(arrayNums.itrabble.reduce(0, (acc, x) => acc + x).toArray(), expectedResult)
})

test('zip', t => {
  const expectedResult = ['a',1,'b',2,'c',3,'d',4]

  t.deepEqual(arrayStrings.itrabble.zip(arrayNums), expectedResult)
})
