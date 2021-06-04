/**
 * Function to return true or false from single argument input.
 * @function predicateFnUnary
 * @param {*} arg
 * @returns {boolean} result - boolean result of arg applied to callback.
 */

import Itrabble from './itrabble';

/**
 * Skips items until callback first returns true, yielding each thereafter.
 * (inverse of @takeUntil)
 *
 * @generator skipUntil
 * @param {predicateFnUnary} callback - function to apply each item and its index to.
 * @yields {*} item - the next item.
 *
 * @example <caption>skipUntil an item is greater than 3</caption>
 * itrabble([1,2,3,4,5,4,3,2,1]).skipUntil(item => item > 3)
 * // => 4, 5, 4, 3, 2, 1
 */

function* skipUntil<T>(
  this: Itrabble<T>,
  callback: (item: T, index: number) => boolean
) {
  let i = 0;
  let skipping = true;
  for (const item of this) {
    skipping = skipping && !callback(item, i++);
    if (!skipping) yield item;
  }
}

export default skipUntil;
