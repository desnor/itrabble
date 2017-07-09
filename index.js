const take = require('./take')
const takeUntil = require('./takeUntil')
const log = require('./log')
// const first = require('./first')
const last = require('./last')

const array = ['a','b','c','d','e','f']
const map = new Map([['a', 'a'],['b', 'b'], ['c', 'c'],['d','d'],['e','e'],['f','f']])

Array.prototype.take = take
Array.prototype.log = log
// Array.prototype.first = first
Array.prototype.last = last
Array.prototype.takeUntil = takeUntil

Map.prototype.take = take
// Map.prototype.first = first
Map.prototype.last = last
Map.prototype.takeUntil = takeUntil

// const aryTake = array.take(4)
// const mapTake = map.take(2)

// const aryFirst = array.first(2)
// const mapFirst = map.first(2)

// const aryTakeUntil = array.takeUntil(x => x === 'e')
// const mapTakeUntil = map.takeUntil(x => x.includes('e'))

const aryLast = array.last()
const mapLast = map.last()

// Array.from(aryTake).log()
// Array.from(mapTake).log()

// Array.from(aryFirst).log()
// Array.from(mapFirst).log()

Array.from(aryLast).log()
Array.from(mapLast).log()

// Array.from(aryTakeUntil).log()
// Array.from(mapTakeUntil).log()
