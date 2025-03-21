import type { PipeableFunction } from '../util-types';

/**
 * Yield only distinct items from source based on return value of given function
 *
 * @generator pipeable distinctBy
 *
 * @example <caption>output distinct items based on return value of given function</caption>
 * itrabble([1,2,3,4,5]).pipe(
 *  distinctBy(x => x % 1)
 * )
 * // => 1, 2, 3
 */
export function distinctBy<T, P>(
  predicate: (value: T) => P
): PipeableFunction<T, T> {
  const distinctSet = new Set<P>();

  return function* (context) {
    for (const item of context) {
      const distinctKey = predicate(item);
      if (distinctSet.has(distinctKey)) {
        continue;
      }
      yield item;
      distinctSet.add(distinctKey);
    }
  };
}
