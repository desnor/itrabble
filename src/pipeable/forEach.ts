/**
 * Callback function that accepts two parameters
 * @function binaryCallback
 * @param {*} firstArg
 * @param {*} secondArg
 * @returns {*} result - result of firstArg and secondArg applied to callback.
 */

/**
 * Pass each item through callback function. Doesn't use return value of callback.
 *
 * @generator pipeable forEach
 * @param {binaryCallback} callback - The callback for each item and index.
 * @yields {*} item - the next item from the collection.
 *
 * @example <caption>Example usage of forEach to log items with index</caption>
 * itrabble([1,2,3]).pipe(
 *  forEach((x, index) => console.log(`${index}: ${x}`))
 * )
 * // logs:
 * // => 0: 1
 * // => 1: 2
 * // => 2: 3
 * // and yields 1, 2, 3
 */
export function forEach(callback) {
  return function* (context) {
    let index = 0
    for (const item of context) {
      callback(item, index++)
      yield item
    }
  }
}
