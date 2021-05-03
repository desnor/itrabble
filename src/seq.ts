/**
 * Yields items in given sequence, with optional starting offset.
 *
 * @generator seq
 * @param {number} n - number of sequence (ie. every nth item).
 * @param {number} [offset=0] - optional offset index from which to start sequence.
 * @yields {*} item - the next item in sequence.
 *
 * @example <caption>seq every 2nd item</caption>
 * itrabble([1,2,3,4,5]).seq(2)
 * // => 1, 3, 5
 * @example <caption>seq every 2nd item, offset by 1</caption>
 * itrabble([1,2,3,4,5]).seq(2, 1)
 * // => 2, 4
 * @example <caption>seq every 3rd item</caption>
 * itrabble([1,2,3,4,5]).seq(3)
 * // => 1, 4
 */

import Itrabble from "./itrabble"

function *seq<T>(this: Itrabble<T>, n: number, offset = 0) {
  let index = 0
  for (const item of this) {
    if (index % n === offset) yield item
    index += 1
  }
}

export default seq
