import eachChunk from './eachChunk'
import filter from './filter'
import first from './first'
import forEach from './forEach'
import last from './last'
import map from './map'
import reduce from './reduce'
import reject from './reject'
import scan from './scan'
import seq from './seq'
import skip from './skip'
import skipUntil from './skipUntil'
import skipWhile from './skipWhile'
import take from './take'
import takeUntil from './takeUntil'
import takeWhile from './takeWhile'
import zip from './zip'
import zipAll from './zipAll'
import zipWith from './zipWith'

import toArray from './toArray'
import toMap from './toMap'
import toSet from './toSet'

import {
  isIterable,
  isObject,
  hasBeenInvoked,
} from './helpers'

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
