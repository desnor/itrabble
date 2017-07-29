require('./itrabble')

const array = ['a','b','c','d','e','f']
const map = new Map([['a', 'a'],['b', 'b'], ['c', 'c'],['d','d'],['e','e'],['f','f']])
const string = 'test string'

console.log(...array.itrabble.skipUntil(x => x === 'd')) // d e f

console.log(...map.itrabble.takeUntil(x => x.includes('e'))) // [ 'a', 'a' ] [ 'b', 'b' ] [ 'c', 'c' ] [ 'd', 'd' ]

console.log(...string.itrabble.takeUntil(x => x === 'i')) // t e s t   s t r

console.log(...array.itrabble.take(3).zip(array.itrabble.first(), map.itrabble.skip(1).take(3))) // [ 'a', 'a', [ 'b', 'b' ] ] [ 'b', undefined, [ 'c', 'c' ] ] [ 'c', undefined, [ 'd', 'd' ] ]
