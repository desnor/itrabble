/**
 * Passes each sequential {n} length slice of items through callback function.
 * Doesn't use return value of callback.
 *
 * @generator eachSlice
 * @param {Number} n - The number of items per slice.
 * @param {variadicCallback} callback - The callback which receives all items in slice.
 * @yields {*} item - the next item from the collection.
 *
 * @example <caption>Example usage of eachSlice to log items</caption>
 * itrabble([1,2,3,4,5]).eachSlice(2, (...nums) => console.log(nums))
 * //
 * // => 1, 2, 3
 * // => 2, 3, 4
 * // => 3, 4, 5
 * // and yields 1, 2, 3, 4, 5
 */

function *eachSlice(n = 1, callback) {
  if (n < 1) throw new RangeError(`Slice size must be at least 1, ${n} was given`)

  const iterator = this[Symbol.iterator]()
  let slice = []

  for (let i = 0; i < n; i++){
    const { value, done } = iterator.next()
    if (done) callback(slice)
    yield { value, done }
    slice.push(value)
  }

  while (!done) {
    callback(slice)
    var { value, done } = iterator.next()
    yield { value, done }
    slice = [...slice.slice(1), value]
  }
}

module.exports = eachSlice
