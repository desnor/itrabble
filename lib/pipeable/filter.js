/**
 * Function to return true or false from two argument input.
 * @function predicateFnBinary
 * @param {*} firstArg
 * @param {*} secondArg
 * @returns {boolean} result - boolean result of firstArg and secondArg
 * applied to callback.
 */

/**
 * Filters items that return true from the given predicate function.
 *
 * @generator pipeable filter
 * @param {predicateFnBinary} predicateFn - function called for each item & index.
 * @yields {*} item - the next filtered item from collection.
 *
 * @example <caption>filter example 1</caption>
 * itrabble([1,2,3]).pipe(
 *  filter(x => x > 1)
 * )
 * // => 2, 3
 * @example <caption>filter example 2</caption>
 * itrabble([1,2,3]).pipe(
 *  filter((x, index) => x > 1 && index < 2)
 * )
 * // => 2
 */
export function filter(predicateFn) {
  return function* (context) {
    let index = 0
    for (const item of context) {
      if (predicateFn(item, index++)) {
        yield item
      }
    }
  }
}
