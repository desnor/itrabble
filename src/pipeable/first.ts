import { PipeableFunction } from '../util-types';

/**
 * Get the first item.
 *
 * @generator pipeable first
 * @yields {*} item - the first item.
 *
 * @example <caption>Example usage of first</caption>
 * itrabble([1,2,3]).pipe(
 *  first()
 * )
 * // => 1
 */
export function first<T>(): PipeableFunction<T> {
  return function* (context) {
    for (const item of context) {
      yield item;
      break;
    }
  };
}
