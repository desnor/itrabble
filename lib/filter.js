/**
 * Function to return true or false from given input.
 * @function predicateFn
 * @param {*} firstArg
 * @param {*} secondArg
 * @returns {boolean} result - boolean result of firstArg and secondArg
 * applied to callback.
 */

/**
 * Filters items that return true from the given predicate function.
 *
 * @generator filter
 * @param {predicateFn} predicateFn - function called for each item & index.
 * @yields {*} item - the next filtered item from collection.
 *
 * @example <caption>filter example 1</caption>
 * itrabble([1,2,3]).filter(x => x > 1)
 * // => 2, 3
 * @example <caption>filter example 2</caption>
 * itrabble([1,2,3]).filter((x, index) => x > 1 && index < 2)
 * // => 2
 */
function *filter(predicateFn){
  let index = 0
  for (const item of this) {
    if (predicateFn(item, index++)) {
      yield item
    }
  }
}

module.exports = filter
