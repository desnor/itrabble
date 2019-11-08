/**
 * Passes each {n} length chunk of items through callback function. If collection
 * doesn't divide evenly into n items, the final chunk will contain remaining items.
 * Doesn't use return value of callback.
 *
 * @generator pipeable eachChunk
 * @param {Number} n - The number of items per chunk.
 * @param {variadicCallback} callback - The callback which receives all {n} items in chunk.
 * @yields {*} item - the next item from the collection.
 *
 * @example <caption>Example usage of eachChunk to log items</caption>
 * itrabble([1,2,3,4,5]).pipe(
 *  eachChunk(3, (...nums) => console.log(...nums))
 * )
 * // logs:
 * // => 1, 2, 3
 * // => 4, 5
 * // and yields 1, 2, 3, 4, 5
 */

export function eachChunk(n, callback) {
  return function* (context) {
    if (n < 1) throw new RangeError(`Chunk size must be at least 1: ${n} given`)

    let chunk = []
    for (const item of context) {
      chunk.push(item)
      if (chunk.length === n) {
        callback(...chunk)
        chunk = []
      }
      yield item
    }
    if (chunk.length > 0) callback(...chunk)
  }
}
