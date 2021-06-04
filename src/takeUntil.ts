/**
 * Yields items until callback first returns true.
 * (inverse of @skipUntil)
 *
 * @generator takeUntil
 * @param {predicateFnUnary} callback - function to apply each item and its index to.
 * @yields {*} item - the next item.
 *
 * @example <caption>takeUntil an item is greater than 3</caption>
 * itrabble([1,2,3,4,5]).takeUntil(item => item > 3)
 * // => 1, 2, 3
 */

import Itrabble from './itrabble';

function* takeUntil<T>(
  this: Itrabble<T>,
  callback: (item: T, index: number) => boolean
) {
  let taking = true;
  let i = 0;
  for (const item of this) {
    taking = taking && !callback(item, i++);
    if (!taking) break;
    yield item;
  }
}

export default takeUntil;
