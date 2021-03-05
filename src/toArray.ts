/**
 * Converts iterable sequence into an Array, invoking any prior transforms.
 *
 * @function toArray
 * @returns {Array} - the iterated context as an array.
 *
 * @example <caption>an `itrabble` is an iterable over the given values</caption>
 * itrabble([1,2,3,4,5])
 * // => an iterable sequence yielding: { 1, 2, 3, 4, 5 }
 * @example <caption>toArray invokes itrabble sequence, converting result
 * into an array</caption>
 * itrabble([1,2,3,4,5]).map(x => x * x).take(4).toArray()
 * // => an array: [1, 4, 9, 16]
 */

function toArray(){
  return Array.from(this)
}

export default toArray
