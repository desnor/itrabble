/**
 * Skips items while callback returns true, yielding each thereafter.
 * (inverse of @takeWhile)
 *
 * @generator skipWhile
 * @param {predicateFnUnary} callback - function to apply each item to.
 * @yields {*} item - the next item.
 *
 * @example <caption>skipWhile an item is less than 3</caption>
 * itrabble([1,2,3,4,5,4,3,2,1]).skipWhile(item => item < 3)
 * // => 4, 5, 4, 3, 2, 1
 */
function *skipWhile(callback) {
  let skipping = true
  for (const item of this) {
    skipping = skipping && callback(item)
    if (!skipping) yield item
  }
}

module.exports = skipWhile
