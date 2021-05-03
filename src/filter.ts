import Itrabble from './itrabble';
/**
 * Filters items that return true from the given predicate function.
 *
 * @generator filter
 * @param {predicateFnBinary} predicateFn - function called for each item & index.
 * @yields {*} item - the next filtered item from collection.
 *
 * @example <caption>filter example 1</caption>
 * itrabble([1,2,3]).filter(x => x > 1)
 * // => 2, 3
 * @example <caption>filter example 2</caption>
 * itrabble([1,2,3]).filter((x, index) => x > 1 && index < 2)
 * // => 2
 */
function* filter<T, S extends T>(
  this: Itrabble<T>,
  predicateFn: (item: T, index?: number) => item is S
) {
  let index = 0;
  for (const item of this) {
    if (predicateFn(item, index++)) {
      yield item as S;
    }
  }
}

export default filter;
