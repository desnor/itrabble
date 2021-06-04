/**
 * Callback function that accepts multiple parameters
 * @function variadicCallback
 * @param {...*} args
 * @returns {*} result - result of applying args to callback.
 */

import Itrabble from './itrabble';

/**
 * Zips iterated collection with any other given iterables, applying values from each
 * step through given callback function. Effectively a zip and a map in one. Zap!
 *
 * @generator zipWith
 * @param {variadicCallback} callback - function that gets passed one of each
 * iterable per iterating step.
 * @param {...*} its - variable number of iterables to zip.
 * @yields {*} - result of input values applied to mapFn.
 *
 * @example <caption>zipWith itrabble over array with another array</caption>
 * itrabble([1,2,3,4]).zipWith((num, letter) => `${num}${letter}`, ['a','b','c','d'])
 * // => '1a', '2b', '3c', '4d'
 */

function* zipWith<
  T extends unknown,
  R extends unknown,
  IS extends Iterable<unknown>[],
  IST extends [
    ...{
      [I in keyof IS]: IS[I] extends Iterable<infer U> ? U : unknown;
    }
  ],
  TS extends [T, ...IST]
>(this: Itrabble<T>, callback: (...items: TS) => R, ...its: IS) {
  const iterators = [
    this[Symbol.iterator](),
    ...its.map((it) => it[Symbol.iterator]()),
  ];
  while (true) {
    const next = iterators.map((it) => it.next());
    if (next.every((elm) => elm.done)) break;
    yield callback(...(next.map((elm) => elm.value) as TS));
  }
}

export default zipWith;
