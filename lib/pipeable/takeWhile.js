/**
 * Yields items until callback returns false.
 * (inverse of @skipWhile)
 *
 * @generator pipeable takeWhile
 * @param {predicateFnUnary} callback - function to apply each item to.
 * @yields {*} item - the next item.
 *
 * @example <caption>takeWhile an item is less than 4</caption>
 * itrabble([1,2,3,4,5,4,3,2,1]).pipe(
 *  takeWhile(item => item < 4)
 * )
 * // => 1, 2, 3
 */
function takeWhile(callback) {
  return function* pipedTakeWhile (context) {
    let taking = true
    for (const item of context) {
      taking = taking && callback(item)
      if (!taking) break
      yield item
    }
  }
}

module.exports = takeWhile
