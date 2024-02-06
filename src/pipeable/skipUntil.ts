/**
 * Function to return true or false from two argument input.
 * @function predicateFnBinary
 * @param {*} item - current item in iteration
 * @param {number} [index] - optional index of iterated item to use
 * @returns {boolean} result
 */

import type { PipeableFunction } from '../util-types';

/**
 * Skips items until callback first returns true, yielding each thereafter.
 * (inverse of @takeUntil)
 *
 * @generator pipeable skipUntil
 * @param {predicateFnBinary} callback - function to apply each item and index to.
 * @yields {*} item - the next item.
 *
 * @example <caption>skipUntil an item is greater than 3</caption>
 * itrabble([1,2,3,4,5,4,3,2,1]).pipe(
 *  skipUntil(item => item > 3)
 * )
 * // => 4, 5, 4, 3, 2, 1
 */

function skipUntil<T>(
  callback: (item: T, index: number) => boolean
): PipeableFunction<T> {
  return function* (context) {
    let skipping = true;
    let index = 0;
    for (const item of context) {
      skipping = skipping && !callback(item, index++);
      if (!skipping) yield item;
    }
  };
}

export { skipUntil };
