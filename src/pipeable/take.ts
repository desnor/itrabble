import { PipeableFunction } from '../util-types';

/**
 * Yields given count of items, optionally offset by given index.
 *
 * @generator pipeable take
 * @param {number} count - number of items to take.
 * @param {number} [offset=0] - optional offset index from which to start taking.
 * @yields {*} item - the next item.
 * *
 * @example <caption>take the first item</caption>
 * itrabble([1,2,3,4,5]).pipe(
 *  take(1)
 * )
 * // => 1
 * @example <caption>take the second and third items</caption>
 * itrabble([1,2,3,4,5]).pipe(
 *  take(2, 1)
 * )
 * // => 2, 3
 */
function take<T>(count: number, offset = 0): PipeableFunction<T> {
  return function* (context) {
    for (const item of context) {
      if (offset-- > 0) continue;
      if (count-- === 0) break;
      yield item;
    }
  };
}

export { take };
