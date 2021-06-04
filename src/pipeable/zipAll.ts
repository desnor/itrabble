import { PipeableFunction } from '../util-types';

/**
 * Zips iterated collection with any given iterables, continuing until the
 * largest iterable is complete, giving undefined values from any iterables
 * that complete before then.
 *
 * @generator pipeable zipAll
 * @param {...iterable} iterables - variable number of iterables with which to zip.
 * @yields {...*} values - the next value of each iterable being zipped.
 *
 * @example <caption>zipAll itrabble over array with another array</caption>
 * itrabble([1,2,3]).pipe(
 *  zipAll(['a','b','c','d'])
 * )
 * // => [1, 'a'], [2, 'b'], [3, 'c'], [undefined, 'd']
 * @example <caption>zipAll itrabble over array with a map</caption>
 * itrabble([1,2,3]).pipe(
 *  zipAll(new Map([['a', 'A'], ['b','B']]))
 * )
 * // => [1, ['a', 'A']], [2, ['b','B']], [3, undefined]]
 */

function zipAll<
  T extends unknown,
  IS extends Iterable<unknown>[],
  IST extends [
    ...{
      [I in keyof IS]: IS[I] extends Iterable<infer U> ? U : unknown;
    }
  ],
  TS extends [T, ...IST]
>(...iterables: IS): PipeableFunction<T, TS> {
  return function* (context) {
    const iterators = [
      context[Symbol.iterator](),
      ...iterables.map((it) => it[Symbol.iterator]()),
    ];

    while (true) {
      const next = iterators.map((it) => it.next());
      if (next.every((elm) => elm.done)) break;
      yield next.map((elm) => elm.value) as TS;
    }
  };
}

export { zipAll };
