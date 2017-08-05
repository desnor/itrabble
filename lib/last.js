/**
 * Get the last item. -- WARNING: This will iterate through collection
 * until it reaches the end, so do not use on an infinite sequence!
 *
 * @generator last
 * @yields {*} item - the last item.
 *
 * @example <caption>Example usage of last</caption>
 * itrabble([1,2,3]).last()
 * // => 3
 */
function *last() {
  let item
  for (item of this) {} // eslint-disable-line no-empty
  yield item
}

module.exports = last
