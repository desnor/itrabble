/**
 * Zips iterated collection with any given iterables.
 *
 * @generator pipeable zip
 * @param {...iterable} its - variable number of iterables with which to zip.
 * @yields {...*} values - the next value of each iterable being zipped.
 *
 * @example <caption>zip itrabble over array with another array</caption>
 * itrabble([1,2,3,4]).pipe(
 *  zip(['a','b','c','d'])
 * )
 * // => [1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']
 * @example <caption>zip itrabble over array with a map</caption>
 * itrabble([1,2,3,4]).pipe(
 *  zip(new Map([['a', 'A'], ['b','B'], ['c','C'], ['d','D']]))
 * )
 * // => [1, ['a', 'A']], [2, ['b','B']], [3, ['c','C']], [4, ['d','D']]
 */

function zip(...its) {
  return function* (context) {
    const iterators = [
      context[Symbol.iterator](),
      ...its.map(it => it[Symbol.iterator]())
    ]
    while (true) { // eslint-disable-line no-constant-condition
      const next = iterators.map(it => it.next())
      if (next.some(elm => elm.done)) break
      yield (next.map(elm => elm.value))
    }
  }
}

module.exports = zip
