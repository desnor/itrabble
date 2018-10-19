/**
 * Reduces iterable collection into single result, yielding each iteration.
 *
 * @generator scan
 * @param {binaryCallback} callback - Callback for memo and item.
 * @param {*} memo - initial value of memo
 * @yields {*} memo - the accumulated result of passing memo and each item
 * to callback.
 *
 * @example <caption>scan to sum items</caption>
 * itrabble([1,2,3]).scan((sum, item) => sum + item, 0)
 * // => 1, 3, 6
 * @example <caption>scan to join items into one string</caption>
 * itrabble(['a','b','c']).scan((string, item) => string.concat(item), '')
 * // => 'a', 'ab', 'abc'
 * @example <caption>scan to filter and map items</caption>
 * itrabble([1,2,3]).scan((memo, item) => {
 *  return item > 1 ? memo.concat([ item ** 3 ]) : memo
 * }, [])
 * // => [], [8], [8, 27]
 */

function *scan(callback, memo) {
  for (const item of this) {
    memo = callback(memo, item)
    yield memo
  }
}

module.exports = scan
