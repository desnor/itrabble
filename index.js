const take = require('./take')
const log = require('./log')

const array = ['a','b','c','d','e','f']
const map = new Map([['a', 'a'],['b', 'b'], ['c', 'c']])

Array.prototype.take = take
Array.prototype.log = log

Map.prototype.take = take

const first = array.take(6)
const second = map.take(2)

Array.from(first).log()
Array.from(second).log()
