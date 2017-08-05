/**
 * Get the first item from the iterable collection on which it is called.
 *
 * @generator
 * @yields {*} - the first item from collection.
 *
 * @example <caption>Example usage of first</caption>
 * // yields 1
 * itrabble([1,2,3]).first()
 */
function *first() {
  for (const elm of this) {
    yield elm
    break
  }
}

module.exports = first
