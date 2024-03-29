import type { PipeableFunction } from '../util-types';

/**
 * Get the last item. -- WARNING: This will iterate through collection
 * until it reaches the end, so do not use on an infinite sequence!
 *
 * @generator pipeable last
 * @yields {*} item - the last item.
 *
 * @example <caption>Example usage of last</caption>
 * itrabble([1,2,3]).pipe(
 *  last()
 * )
 * // => 3
 */
export function last<T>(): PipeableFunction<T> {
  return function* (context) {
    let item: T;
    // eslint-disable-next-line no-empty
    for (item of context) {
    }
    // @ts-expect-error - expects item to be defined before used
    yield item;
  };
}
