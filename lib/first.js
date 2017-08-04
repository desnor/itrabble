/**
 * Get the first item from the iterable collection on which it is called.
 *
 * @generator
 * @yields {*} - the first item from collection.
**/
function *first() {
  for (const elm of this) {
    yield elm
    break
  }
}

module.exports = first
