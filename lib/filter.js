/**
 * Function to return true or false from given input.
 * @function predicateFn
 * @param {*} - takes any type for input.
 * @param {number} index - index of item passed into predicateFn.
 * @returns {boolean}
 */

/**
 * Filter items from the iterable collection on which it is
 * called that return true from the given predicate function.
 *
 * @generator filter
 * @param {predicateFn} predicateFn - function called for each item.
 * @yields {*} - the next filtered item from collection.
 *
 * @example <caption>filter example 1</caption>
 * // yields 2, 3
 * itrabble([1,2,3]).filter(x => x > 1)
 * @example <caption>filter example 2</caption>
 * // yields 2
 * itrabble([1,2,3]).filter((x, index) => x > 1 && index < 2)
 */
function *filter(predicateFn){
  let index = 0
  for (let elm of this) {
    if (predicateFn(elm, index++)) {
      yield elm
    }
  }
}

module.exports = filter
