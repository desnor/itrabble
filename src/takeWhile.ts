import Itrabble from "./itrabble"

/**
 * Yields items until callback returns false.
 * (inverse of @skipWhile)
 *
 * @generator takeWhile
 * @param {predicateFnUnary} callback - function to apply each item to.
 * @yields {*} item - the next item.
 *
 * @example <caption>takeWhile an item is less than 4</caption>
 * itrabble([1,2,3,4,5,4,3,2,1]).takeWhile(item => item < 4)
 * // => 1, 2, 3
 */
function *takeWhile<T>(this: Itrabble<T>, callback: (item: T) => boolean) {
  let taking = true
  for (const item of this) {
    taking = taking && callback(item)
    if (!taking) break
    yield item
  }
}

export default takeWhile
