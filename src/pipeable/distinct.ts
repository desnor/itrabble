import type { PipeableFunction } from '../util-types';

/**
 * Yield only distinct items from source
 *
 * @generator pipeable distinct
 *
 * @example <caption>output distinct items only</caption>
 * itrabble([1,2,3,2,1]).pipe(
 *  distinct()
 * )
 * // => 1, 2, 3
 */
export function distinct<T>(): PipeableFunction<T, T> {
  const distinctSet = new Set<T>();
  return function* (context) {
    for (const item of context) {
      if (distinctSet.has(item)) {
        continue;
      }
      yield item;
      distinctSet.add(item);
    }
  };
}
