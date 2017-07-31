require('./itrabble')

const array = ['a','b','c','d','e','f']
const map = new Map([['a', 'a'],['b', 'b'], ['c', 'c'],['d','d'],['e','e'],['f','f']])
const string = 'test string'

console.log(array.itrabble.first().toArray())
console.log(array.itrabble.take(6,2).toArray())
console.log(array.itrabble.skipUntil(x => x === 'd').toArray())
console.log(map.itrabble.takeUntil(x => x.includes('e')).toMap())
console.log(...string.itrabble.takeUntil(x => x === 'i'))
console.log(array.itrabble.take(3).zip(array.itrabble.first(), map.itrabble.skip(1).take(3)).toArray())
console.log(array.itrabble.zip( array, map, string ).take(3).toArray())
console.log(array.itrabble.zipWith((ary, map) => map.concat(ary), map ).take(4).toArray())
