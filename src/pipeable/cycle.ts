import { PipeableFunction } from '../util-types';

/**
 * Concatenates any given iterable onto end of itrabble context.
 *
 * @generator pipeable concat
 * @param {*} item - iterable item to add onto end of iterated sequence.
 * @yields {*} value - the next value of the combined iterable sequence.
 *
 * @example <caption>concat array of letters onto itrabble of numbers</caption>
 * itrabble([1,2,3,4]).pipe(
 *  concat(['a','b','c','d'])
 * )
 * // => 1, 2, 3, 4, a, b, c, d
 *
 * @example <caption>concat itrabble of letters onto itrabble of numbers</caption>
 * const lettersIt = itrabble(['a','b','c','d'])
 * itrabble([1,2,3,4]).pipe(
 *  concat(lettersIt)
 * )
 * // => 1, 2, 3, 4, a, b, c, d
 */

export function cycle<T>(n?: number): PipeableFunction<T, T> {
  let i = n ?? Infinity;
  return function* cyc(context): Generator<T> {
    while (i-- > 0) {
      for (const item of context) {
        yield item;
      }
      yield* cyc(context);
    }
  };
}
