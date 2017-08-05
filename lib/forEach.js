/**
 * @function itemWithIndex
 * @param {*} item
 * @param {number} index
 */

/**
 * Pass each item from the iterable collection on which it is called through callback function.
 *
 * @generator filter
 * @param {itemWithIndex} callback - The callback for each item and index.
 * @yields {*} - the next item from the collection.
 *
 * @example <caption>Example usage of forEach</caption>
 * // logs
 * // 0: 1
 * // 1: 2
 * // 2: 3
 * // and yields 1, 2, 3
 * itrabble([1,2,3]).forEach((x, index) => console.log(`${index}: ${x}`))
 */
function *forEach(callback) {
  let index = 0
  for (let elm of this) {
    callback(elm, index++)
    yield elm
  }
}

module.exports = forEach
