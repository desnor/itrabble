/**
 * Zips iterated collection with any given iterables, continuing until the
 * largest iterable is complete, giving undefined values from any iterables
 * that complete before then.
 *
 * @generator zipAll
 * @param {...iterable} its - variable number of iterables with which to zip.
 * @yields {...*} values - the next value of each iterable being zipped.
 *
 * @example <caption>zipAll itrabble over array with another array</caption>
 * itrabble([1,2,3]).zipAll(['a','b','c','d'])
 * // => [1, 'a'], [2, 'b'], [3, 'c'], [undefined, 'd']
 * @example <caption>zipAll itrabble over array with a map</caption>
 * itrabble([1,2,3]).zipAll(new Map([['a', 'A'], ['b','B']]))
 * // => [1, ['a', 'A']], [2, ['b','B']], [3, undefined]]
 */

import Itrabble from "./itrabble"

function *zipAll<T, TS extends Iterable<T>[]>(this: Itrabble<T>, ...its: TS): Generator<Array<T | undefined>> {
  const iterators = [
    this[Symbol.iterator](),
    ...its.map(it => it[Symbol.iterator]())
  ]
  while (true) { // eslint-disable-line no-constant-condition
    const next = iterators.map(it => it.next())
    if (next.every(elm => elm.done)) break
    yield (next.map(elm => elm.value))
  }
}

export default zipAll
