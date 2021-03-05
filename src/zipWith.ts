/**
 * Callback function that accepts multiple parameters
 * @function variadicCallback
 * @param {...*} args
 * @returns {*} result - result of applying args to callback.
 */

/**
 * Zips iterated collection with any other given iterables, applying values from each
 * step through given callback function. Effectively a zip and a map in one. Zap!
 *
 * @generator zipWith
 * @param {variadicCallback} callback - function that gets passed one of each
 * iterable per iterating step.
 * @param {...*} its - variable number of iterables to zip.
 * @yields {*} - result of input values applied to mapFn.
 *
 * @example <caption>zipWith itrabble over array with another array</caption>
 * itrabble([1,2,3,4]).zipWith((num, letter) => `${num}${letter}`, ['a','b','c','d'])
 * // => '1a', '2b', '3c', '4d'
 */

function *zipWith(callback, ...its) {
  const iterators = [
    this[Symbol.iterator](),
    ...its.map(it => it[Symbol.iterator]())
  ]
  while (true) { // eslint-disable-line no-constant-condition
    const next = iterators.map(it => it.next())
    if (next.every(elm => elm.done)) break
    yield (callback(...next.map(elm => elm.value)))
  }
}

export default zipWith
