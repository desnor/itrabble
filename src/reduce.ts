import Itrabble from './itrabble';
/**
 * Reduce iterable collection into single yielded result.
 *
 * @generator reduce
 * @param {binaryCallback} callback - Callback for memo, each item and its index.
 * @param {*} memo - initial value of memo
 * @yields {*} memo - the accumulated result of passing memo, each item and its index
 * to callback.
 *
 * @example <caption>reduce to sum items</caption>
 * itrabble([1,2,3]).reduce((sum, item) => sum + item, 0)
 * // => 6
 * @example <caption>reduce to join items into one string</caption>
 * itrabble(['a','b','c']).reduce((string, item) => string.concat(item), '')
 * // => 'abc'
 * @example <caption>reduce to filter and map items</caption>
 * itrabble([1,2,3]).reduce((memo, item) => {
 *  return item > 1 ? memo.concat([ item ** 3 ]) : memo
 * }, [])
 * // => [ 8, 27 ]
 */

function* reduce<T, R>(
  this: Itrabble<T>,
  callback: (memo: R, item: T, index: number) => R,
  memo: R
) {
  let index = 0;
  for (const item of this) {
    memo = callback(memo, item, index++);
  }
  yield memo;
}

export default reduce;
