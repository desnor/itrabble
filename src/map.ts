/**
 * Map each item through callback function.
 *
 * @generator map
 * @param {binaryCallback} callback - The callback for each item and index.
 * @yields {*} mappedItem - whatever the applied callback returns.
 *
 * @example <caption>map to increment each item by 1</caption>
 * itrabble([1,2,3]).map(x => x + 1)
 * // => 2, 3, 4
 * @example <caption>map to add item with index</caption>
 * itrabble([1,2,3]).map((x, index) => x + index)
 * // => 1, 3, 5
 * @example <caption>map to return item as string</caption>
 * itrabble([1,2,3]).map(x => String(x))
 * // => '1', '2', '3'
 */

import Itrabble from "./itrabble"

function *map<T, R>(this: Itrabble<T>, callback: (item: T, index?: number) => R) {
  let index = 0
  for (const item of this) {
    yield callback(item, index)
    index += 1
  }
}

export default map
