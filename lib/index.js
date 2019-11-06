import eachChunk from './eachChunk.js'
import filter from './filter.js'
import first from './first.js'
import forEach from './forEach.js'
import last from './last.js'
import map from './map.js'
import reduce from './reduce.js'
import reject from './reject.js'
import scan from './scan.js'
import seq from './seq.js'
import skip from './skip.js'
import skipUntil from './skipUntil.js'
import skipWhile from './skipWhile.js'
import take from './take.js'
import takeUntil from './takeUntil.js'
import takeWhile from './takeWhile.js'
import zip from './zip.js'
import zipAll from './zipAll.js'
import zipWith from './zipWith.js'

import toArray from './toArray.js'
import toMap from './toMap.js'
import toSet from './toSet.js'

import {
  isIterable,
  isObject,
  hasBeenInvoked,
} from './helpers/index.js'

const iterableMethods = {
  eachChunk, filter, first, forEach, last, map, reduce, reject, scan, seq, skip, skipUntil, skipWhile,
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

Itrabble.prototype.pipe = function(...iteratorFuncs) {
  const pipeline = iteratorFuncs.reduce((collectedPipeline, iteratorFunc) => iteratorFunc(collectedPipeline), this)

  if (hasBeenInvoked(pipeline)) return pipeline

  return new Itrabble(pipeline)
}

/**
 * Accepts an iterable as a source. Alternatively if provided a plain object
 * it will return an itrabble instance over the entries of the given object
 * @param {*} source
 */
export function from(source) {
  if (isIterable(source)) return Itrabble(source)

  if (isObject(source)) return Itrabble(Object.entries(source))

  return Itrabble(Array.of(source))
}

/**
 * Accepts any number of values over which it will create and return an itrabble
 * instance
 *
 * @param  {...any} values
 */
export function of(...values) {
  return Itrabble(values)
}
