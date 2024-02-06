import type { PipeableFunction } from '../util-types';

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
export function concat<
  T,
  I extends Iterable<unknown>,
  IT extends I extends Iterable<infer U> ? U : never
>(item: I): PipeableFunction<T, T | IT> {
  return function* (context) {
    yield* context;
    yield* item as Iterable<IT>;
  };
}
