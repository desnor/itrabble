/**
 * Filters items that return false from the given predicate function.
 * (opposite of @filter)
 *
 * @generator reject
 * @param {predicateFn} predicateFn - function called for each item & index.
 * @yields {*} item - the next filtered item from collection.
 *
 * @example <caption>reject example 1</caption>
 * itrabble([1,2,3]).reject(item => item < 2)
 * // => 2, 3
 * @example <caption>reject example 2</caption>
 * itrabble([1,2,3]).reject((item, index) => item === 1 || index === 2)
 * // => 2
 */

function *reject(callback) {
  let index = 0
  for (const item of this) {
    if (!callback(item, index++)) {
      yield item
    }
  }
}

module.exports = reject
