/**
 * Get the first item.
 *
 * @generator pipeable first
 * @yields {*} item - the first item.
 *
 * @example <caption>Example usage of first</caption>
 * itrabble([1,2,3]).pipe(
 *  first()
 * )
 * // => 1
 */
function first() {
  return function* (context) {
    for (const item of context) {
      yield item
      break
    }
  }
}

export default first
