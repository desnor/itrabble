/**
 * Skips given number of items, yielding each thereafter.
 *
 * @generator pipeable skip
 * @param {number} count - number of items to skip from start of iterable.
 * @yields {*} item - the next item.
 *
 * @example <caption>skip the first item</caption>
 * itrabble([1,2,3,4,5]).pipe(
 *  skip(1)
 * )
 * // => 2, 3, 4, 5
 * @example <caption>skip the first two items</caption>
 * itrabble([1,2,3,4,5]).pipe(
 *  skip(2)
 * )
 * // => 3, 4, 5
 */

function skip(count) {
  return function* (context) {
    for (const item of context) {
      if (count-- > 0) continue
      yield item
    }
  }
}

export default skip
