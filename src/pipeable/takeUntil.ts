import { PipeableFunction } from '../util-types';

/**
 * Yields items until callback first returns true.
 * (inverse of @skipUntil)
 *
 * @generator pipeable takeUntil
 * @param {predicateFnUnary} callback - function to apply each item to.
 * @yields {*} item - the next item.
 *
 * @example <caption>takeUntil an item is greater than 3</caption>
 * itrabble([1,2,3,4,5]).pipe(
 *  takeUntil(item => item > 3)
 * )
 * // => 1, 2, 3
 */

function takeUntil<T>(
  callback: (item: T, index: number) => boolean
): PipeableFunction<T> {
  return function* (context) {
    let taking = true;
    let index = 0;
    for (const item of context) {
      taking = taking && !callback(item, index++);
      if (!taking) break;
      yield item;
    }
  };
}

export { takeUntil };
