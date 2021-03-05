/**
 * Get the first item.
 *
 * @generator first
 * @yields {*} item - the first item.
 *
 * @example <caption>Example usage of first</caption>
 * itrabble([1,2,3]).first()
 * // => 1
 */
function *first() {
  for (const item of this) {
    yield item
    break
  }
}

export default first
