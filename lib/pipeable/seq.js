/**
 * Yields items in given sequence, with optional starting offset.
 *
 * @generator pipeable seq
 * @param {number} n - number of sequence (ie. every nth item).
 * @param {number} [offset=0] - optional offset index from which to start sequence.
 * @yields {*} item - the next item in sequence.
 *
 * @example <caption>seq every 2nd item</caption>
 * itrabble([1,2,3,4,5]).pipe(
 *  seq(2)
 * )
 * // => 1, 3, 5
 * @example <caption>seq every 2nd item, offset by 1</caption>
 * itrabble([1,2,3,4,5]).pipe(
 *  seq(2, 1)
 * )
 * // => 2, 4
 * @example <caption>seq every 3rd item</caption>
 * itrabble([1,2,3,4,5]).pipe(
 *  seq(3)
 * )
 * // => 1, 4
 */

export function seq(n, offset = 0) {
  return function* (context) {
    let index = 0
    for (const item of context) {
      if (index % n === offset) yield item
      index += 1
    }
  }
}
