/**
 * Yields items until callback first returns true.
 * (inverse of @skipUntil)
 *
 * @generator pipeable takeUntil
 * @param {predicateFnUnary} callback - function to apply each item to.
 * @yields {*} item - the next item.
 *
 * @example <caption>takeUntil an item is greater than 3</caption>
 * itrabble([1,2,3,4,5]).pipe(
 *  takeUntil(item => item > 3)
 * )
 * // => 1, 2, 3
 */

function takeUntil(callback) {
  return function* (context) {
    let taking = true
    for (const item of context) {
      taking = taking && !callback(item)
      if (!taking) break
      yield item
    }
  }
}

module.exports = takeUntil
