/**
 * Reduce iterable collection into single yielded result.
 *
 * @generator pipeable reduce
 * @param {binaryCallback} callback - Callback for memo and item.
 * @param {*} memo - initial value of memo
 * @yields {*} memo - the accumulated result of passing memo and each item
 * to callback.
 *
 * @example <caption>reduce to sum items</caption>
 * itrabble([1,2,3]).pipe(
 *  reduce((sum, item) => sum + item, 0)
 * )
 * // => 6
 * @example <caption>reduce to join items into one string</caption>
 * itrabble(['a','b','c']).pipe(
 *  reduce((string, item) => string.concat(item), '')
 * )
 * // => 'abc'
 * @example <caption>reduce to filter and map items</caption>
 * itrabble([1,2,3]).pipe(
 *  reduce((memo, item) => {
  *  return item > 1 ? memo.concat([ item ** 3 ]) : memo
  * }, [])
 * )
 * // => [ 8, 27 ]
 */

export function reduce(callback, memo) {
  return function* (context) {
    for (const item of context) {
      memo = callback(memo, item)
    }
    yield memo
  }
}
