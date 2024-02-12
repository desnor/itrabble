import type { PipeableFunction } from '../util-types';

/**
 * Skips items while callback returns true, yielding each thereafter.
 * (inverse of @takeWhile)
 *
 * @generator pipeable skipWhile
 * @param {predicateFnUnary} callback - function to apply each item to.
 * @yields {*} item - the next item.
 *
 * @example <caption>skipWhile an item is less than 3</caption>
 * itrabble([1,2,3,4,5,4,3,2,1]).pipe(
 *   skipWhile(item => item < 3)
 * }
 * // => 4, 5, 4, 3, 2, 1
 */
function skipWhile<T>(
  callback: (item: T, index: number) => boolean
): PipeableFunction<T> {
  return function* (context) {
    let skipping = true;
    let index = 0;
    for (const item of context) {
      skipping = skipping && callback(item, index++);
      if (!skipping) yield item;
    }
  };
}

export { skipWhile };
