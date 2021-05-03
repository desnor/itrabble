/**
 * Skips given number of items, yielding each thereafter.
 *
 * @generator skip
 * @param {number} count - number of items to skip from start of iterable.
 * @yields {*} item - the next item.
 *
 * @example <caption>skip the first item</caption>
 * itrabble([1,2,3,4,5]).skip(1)
 * // => 2, 3, 4, 5
 * @example <caption>skip the first two items</caption>
 * itrabble([1,2,3,4,5]).skip(2)
 * // => 3, 4, 5
 */

import Itrabble from "./itrabble"

function *skip<T>(this: Itrabble<T>, count: number) {
  for (const item of this) {
    if (count-- > 0) continue
    yield item
  }
}

export default skip
