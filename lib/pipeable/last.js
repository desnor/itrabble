/**
 * Get the last item. -- WARNING: This will iterate through collection
 * until it reaches the end, so do not use on an infinite sequence!
 *
 * @generator pipeable last
 * @yields {*} item - the last item.
 *
 * @example <caption>Example usage of last</caption>
 * itrabble([1,2,3]).pipe(
 *  last()
 * )
 * // => 3
 */
function last() {
  return function* (context) {
    let item
    for (item of context) { } // eslint-disable-line no-empty
    yield item
  }
}

module.exports = last
