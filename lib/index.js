const eachChunk = require('./eachChunk')
const filter = require('./filter')
const first = require('./first')
const forEach = require('./forEach')
const last = require('./last')
const map = require('./map')
const reduce = require('./reduce')
const reject = require('./reject')
const seq = require('./seq')
const skip = require('./skip')
const skipUntil = require('./skipUntil')
const skipWhile = require('./skipWhile')
const take = require('./take')
const takeUntil = require('./takeUntil')
const takeWhile = require('./takeWhile')
const zip = require('./zip')
const zipAll = require('./zipAll')
const zipWith = require('./zipWith')

const toArray = require('./toArray')
const toMap = require('./toMap')
const toSet = require('./toSet')

const iterableMethods = {
  eachChunk, filter, first, forEach, last, map, reduce, reject, seq, skip, skipUntil, skipWhile,
  take, takeUntil, takeWhile, zip, zipAll, zipWith
}

const invocationMethods = {
  toArray, toMap, toSet
}

function Itrabble(context){
  if (!this || this.constructor !== Itrabble) return new Itrabble(context)
  this[Symbol.iterator] = context[Symbol.iterator].bind(context)
  this.addEnumerables(iterableMethods, invocationMethods)
}

Itrabble.prototype.addEnumerables = function(enumerables, invocations){
  Object.entries(enumerables).forEach(([name, implementation]) => {
    this[name] = this.buildIterator(implementation)
  })
  Object.entries(invocations).forEach(([name, method]) => {
    this[name] = method.bind(this)
  })
}

Itrabble.prototype.buildIterator = function(iteratorFunc) {
  return (...args) => new Itrabble({
    [Symbol.iterator]: iteratorFunc.bind(this, ...args)
  })
}

module.exports = Itrabble
