import Itrabble from './itrabble'

import {
  isIterable,
  isObject,
} from './helpers/index.js'

/**
 * Accepts an iterable as a source. Alternatively if provided a plain object
 * it will return an itrabble instance over the entries of the given object
 * @param {*} source
 */
export function from(source) {
  if (isIterable(source)) return new Itrabble(source)

  if (isObject(source)) return new Itrabble(Object.entries(source))

  return Itrabble(Array.of(source))
}

/**
 * Accepts any number of values over which it will create and return an itrabble
 * instance
 *
 * @param  {...any} values
 */
export function of(...values) {
  return new Itrabble(values)
}
