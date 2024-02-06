import type { PipeableFunction } from '../util-types';

/**
 * Yields values from current iterable context repeatedly for the given number of times, default to infinite.
 *
 * @generator pipeable cycle
 * @param {number} repeats - number of times to repeat iteration of given context.
 * @yields {*} value - the next value of the iterable sequence.
 *
 * @example <caption>yield values for the given iterable twice</caption>
 * itrabble([1,2,3,4]).pipe(
 *  cycle(2)
 * )
 * // => 1, 2, 3, 4, 1, 2, 3, 4
 *
 * @example <caption>yield values for the given itrabble infinitely</caption>
 * itrabble([1,2,3,4]).pipe(
 *  cycle()
 * )
 * // => 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4 // .... will iterate forever
 */

export function cycle<T>(n = Infinity): PipeableFunction<T, T> {
  let i = n;
  return function* cyc(context): Generator<T> {
    while (i-- > 0) {
      for (const item of context) {
        yield item;
      }
      yield* cyc(context);
    }
  };
}
