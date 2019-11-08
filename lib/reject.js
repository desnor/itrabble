/**
 * Filters items that return false from the given predicate function.
 * (opposite of @filter)
 *
 * @generator reject
 * @param {predicateFn} predicateFn - function called for each item & index.
 * @yields {*} item - the next filtered item.
 *
 * @example <caption>reject items less than 2</caption>
 * itrabble([1,2,3]).reject(item => item < 2)
 * // => 2, 3
 * @example <caption>reject items that equal 1 or have index of 2</caption>
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

export default reject
