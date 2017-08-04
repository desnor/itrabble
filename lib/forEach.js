/**
 * @callback itemWithIndex
 * @param {*} item
 * @param {number} index
 */

/**
 * Pass each item from the iterable collection on which it is called through callback function.
 *
 * @generator filter
 * @param {itemWithIndex} callback - The callback for each item and index.
 * @yields {*} - the next item from the collection.
**/
function *forEach(callback) {
  let index = 0
  for (let elm of this) {
    callback(elm, index++)
    yield elm
  }
}

module.exports = forEach
