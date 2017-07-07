const take = require('./take')
const log = require('./log')
const first = require('./first')
const last = require('./last')

const array = ['a','b','c','d','e','f']
const map = new Map([['a', 'a'],['b', 'b'], ['c', 'c']])

Array.prototype.take = take
Array.prototype.log = log
Array.prototype.first = first
Array.prototype.last = last

Map.prototype.take = take
Map.prototype.first = first
Map.prototype.last = last

const firstTake = array.take(6)
const secondTake = map.take(2)

const aryFirst = array.first(2)
const mapFirst = map.first(2)

const aryLast = array.last(3)
const mapLast = map.last()

Array.from(firstTake).log()
Array.from(secondTake).log()

Array.from(aryFirst).log()
Array.from(mapFirst).log()

Array.from(aryLast).log()
// Array.from(mapLast).log()
