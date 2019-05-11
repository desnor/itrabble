/**
 * Function to return true or false from single argument input.
 * @function predicateFnUnary
 * @param {*} arg
 * @returns {boolean} result - boolean result of arg applied to callback.
 */

/**
 * Skips items until callback first returns true, yielding each thereafter.
 * (inverse of @takeUntil)
 *
 * @generator pipeable skipUntil
 * @param {predicateFnUnary} callback - function to apply each item to.
 * @yields {*} item - the next item.
 *
 * @example <caption>skipUntil an item is greater than 3</caption>
 * itrabble([1,2,3,4,5,4,3,2,1]).pipe(
 *  skipUntil(item => item > 3)
 * )
 * // => 4, 5, 4, 3, 2, 1
 */

function skipUntil(callback) {
  return function* (context) {
    let skipping = true
    for (const item of context) {
      skipping = skipping && !callback(item)
      if (!skipping) yield item
    }
  }
}

module.exports = skipUntil
