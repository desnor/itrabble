// const take = require('./take')
// const takeUntil = require('./takeUntil')
// const log = require('./log')
// const first = require('./first')
// const last = require('./last')
require('./itrabble')

const array = ['a','b','c','d','e','f']
// const map = new Map([['a', 'a'],['b', 'b'], ['c', 'c'],['d','d'],['e','e'],['f','f']])
// const string = 'test string'

// function withConstructor(constructor){
//   return o => {
//     const proto = Object.assign({},
//       Object.getPrototypeOf(o),
//       { constructor }
//     )
//     return Object.assign(Object.create(proto), o)
//   }
// }
//
// function pipe(...fns) {
//   return x => fns.reduce((y, f) => f(y), x)
// }

// export default function Itrabble(context){
//   if(!this || this.constructor !== Itrabble) return new Itrabble(context)
//   this.context = context
//   this[Symbol.iterator] = function*(){
//     for(let val of context) yield val
//   }
// }
//
// Object.defineProperty(Object.prototype, 'itrabble', {
//   get: function(){
//     return Itrabble(this)
//   }
// })

//
// function takeIterable(n, iterable){
//   return Object.assign({
//     [Symbol.iterator]: () => {
//       const iterator = iterable[Symbol.iterator]()
//
//       return {
//         next: () => {
//           let { done, value } = iterator.next()
//           done = done || n-- <= 0
//           return {
//             done,
//             value: done ? undefined : value
//           }
//         }
//       }
//     }
//   }, Itrabble)
// }
//
// function firstIterable(iterable){
//   const iterator = iterable[Symbol.iterator]()
//   return iterator.next().value
// }
//
// function untilIterable(fn, iterable) {
//   return Object.assign({
//     [Symbol.iterator]: () => {
//       const iterator = iterable[Symbol.iterator]()
//
//       return {
//         next: () => {
//           let { done, value } = iterator.next()
//           done = done || fn(value)
//           return {
//             done,
//             value: done ? undefined : value
//           }
//         }
//       }
//     }
//   }, Itrabble)
// }
//
// function filterWithIterable(fn, iterable){
//   return Object.assign({
//     [Symbol.iterator]: () => {
//       const iterator = iterable[Symbol.iterator]()
//
//       return {
//         next: () => {
//           do {
//             var { done, value } = iterator.next()
//           } while (!done && !fn(value))
//           return { done, value }
//         }
//       }
//     }
//   }, Itrabble)
// }
//
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
//
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
//
// Object.assign(Object.prototype, Itrabble)
// Object.assign(Array.prototype, Itrabble)
// Object.assign(Map.prototype, Itrabble)
// Object.assign(String.prototype, Itrabble)

// array.take(1)
let ary = array.itrabble.takeWhile(x => x !== 'e')
console.log(ary)
