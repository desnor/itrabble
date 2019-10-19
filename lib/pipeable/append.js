/**
 * Adds any given values onto end of itrabble context.
 *
 * @generator pipeable append
 * @param {...*} items - variable number of items to add onto end of iterated sequence.
 * @yields {*} value - the next value of the combined iterable sequence.
 *
 * @example <caption>append array of letters onto itrabble of numbers</caption>
 * itrabble([1,2,3,4]).pipe(
 *  append('a','b','c','d')
 * )
 * // => 1, 2, 3, 4, a, b, c, d
 */

function append(...items) {
  return function* (context) {
    yield * context
    yield * items
  }
}

export default append
