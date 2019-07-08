/**
 * Adds any given values onto start of itrabble context.
 *
 * @generator pipeable prepend
 * @param {...*} items - variable number of items to add onto start of iterated sequence.
 * @yields {*} value - the next value of the combined iterable sequence.
 *
 * @example <caption>prepend array of letters onto itrabble of numbers</caption>
 * itrabble([1,2,3,4]).pipe(
 *  prepend(['a','b','c','d'])
 * )
 * // => 1, 2, 3, 4, a, b, c, d
 */

function prepend(...items) {
  return function* (context) {
    yield * items
    yield * context
  }
}

module.exports = prepend
