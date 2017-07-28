// const take = require('./take')
// const takeUntil = require('./takeUntil')
// const log = require('./log')
// const first = require('./first')
// const last = require('./last')
require('./itrabble')

const array = ['a','b','c','d','e','f']
// const map = new Map([['a', 'a'],['b', 'b'], ['c', 'c'],['d','d'],['e','e'],['f','f']])
// const string = 'test string'


// function keysIterable(iterable){
//   return Object.assign({
//     [Symbol.iterator]: () => {
//       const iterator = iterable[Symbol.iterator]()
//
//       return {
//         next: () => {
//           const { done, value: [key] } = iterator.next()
//           return { done, value: key }
//         }
//       }
//     }
//   }, Itrabble)
// }

// // const makeItrabble = iteratee => pipe(
// //   firstable,
// //   withConstructor(makeItrabble)
// // )(iteratee)
//
// const Itrabble = {
//   take(n = 1) {
//     return takeIterable(n, this)
//   },
//   takeUntil(fn) {
//     return untilIterable(fn, this)
//   },
//   filterWith(fn) {
//     return filterWithIterable(fn, this)
//   },
//   first() {
//     return firstIterable(this)
//   },
//   keys() {
//     return keysIterable(this)
//   },
//   toArray() {
//     return Array.from(this)
//   },
//   toMap() {
//     return new Map(this)
//   },
//   toObject() {
//     const proto = Object.assign({}, Object.getPrototypeOf(this))
//     return Object.assign(Object.create(proto), this)
//   },
//   toStr() {
//     return String(...this)
//   },
//   log() {
//     console.log(this)
//     return this
//   },
// }

let ary = array.itrabble.takeWhile(x => x !== 'e')
console.log(ary)
