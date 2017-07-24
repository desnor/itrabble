const take = require('./take')
const takeUntil = require('./takeUntil')
const log = require('./log')
const first = require('./first')
const last = require('./last')

const array = ['a','b','c','d','e','f']
const map = new Map([['a', 'a'],['b', 'b'], ['c', 'c'],['d','d'],['e','e'],['f','f']])
const string = 'test string'

Object.assign(Array.prototype, { first, last, log, take, takeUntil })
Object.assign(Map.prototype, { first, last, log, take, takeUntil })
Object.assign(String.prototype, { first, last, log, take, takeUntil })

// const aryTake = array.take(4)
// const mapTake = map.take(2)
const stringTake = string.take(2)

// const aryFirst = array.first(2)
// const mapFirst = map.first(2)

// const aryTakeUntil = array.takeUntil(x => x === 'e')
// const mapTakeUntil = map.takeUntil(x => x.includes('e'))
const stringTakeUntil = string.takeUntil(x => x === 'i')

// const aryLast = array.last()
// const mapLast = map.last()
const stringLast = string.last()

// Array.from(aryTake).log()
// Array.from(mapTake).log()
Array.from(stringTake).log()

// Array.from(aryFirst).log()
// Array.from(mapFirst).log()

// Array.from(aryLast).log()
// Array.from(mapLast).log()
// Array.from(stringLast).log()

// Array.from(aryTakeUntil).log()
// Array.from(mapTakeUntil).log()
Array.from(stringTakeUntil).log()
