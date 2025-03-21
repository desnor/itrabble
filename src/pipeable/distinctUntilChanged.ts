import type { PipeableFunction } from '../util-types';

/**
 * Yield only distinct items from source until a change
 *
 * @generator pipeable distinctUntilChanged
 *
 * @example <caption>output distinct items until the value changes</caption>
 * itrabble([1,1,2,2,3,4,5]).pipe(
 *  distinctUntilChanged()
 * )
 * // => 1, 2, 3, 4, 5
 */
export function distinctUntilChanged<T>(): PipeableFunction<T, T> {
  return function* (context) {
    let lastVal: T | undefined;

    for (const item of context) {
      if (item === lastVal) {
        continue;
      }
      yield item;
      lastVal = item;
    }
  };
}
