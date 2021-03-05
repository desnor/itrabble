/**
 * Converts iterable sequence into a Set, invoking any prior transforms.
 *
 * @function toSet
 * @returns {Set} - the iterated context invoked and formatted into a Set.
 *
 * @example <caption>an `itrabble` is an iterable over the given values</caption>
 * itrabble([1,2,3,4,5,4,3,2,1])
 * // => an iterable sequence yielding: { 1, 2, 3, 4, 5, 4, 3, 2, 1 }
 * @example <caption>toSet converts straight into a Set</caption>
 * itrabble([1,2,3,4,5,4,3,2,1]).pipe(
 *  toSet()
 * )
 * // => Set { 1, 2, 3, 4, 5}
 * @example <caption>toSet invokes transforms before converting into Set</caption>
 * itrabble([[1,2],[3,4],[5,4],[3,2],1]).pipe(
 *  take(2),
 *  toSet()
 * )
 * // => Set { [ 1, 2 ], [ 3, 4 ] }
 */
export function toSet() {
  return function (context ) {
    return new Set(context)
  }
}
