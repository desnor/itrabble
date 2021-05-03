import Itrabble from './itrabble';
import { AsTuple } from './util-types';

/**
 * Converts iterable sequence into a Map, invoking any prior transforms.
 * Optional formatFn can be given to return a specific format for the Map.
 *
 * @function toMap
 * @returns {Map} - the iterated context invoked and formatted into a Map.
 *
 * @example <caption>an `itrabble` is an iterable over the given values</caption>
 * itrabble([[1,2],[3,4],5])
 * // => an iterable sequence yielding: { [1, 2], [3, 4], 5 }
 * @example <caption>calling toMap on a malformed map shape throws error</caption>
 * itrabble([[1,2],[3,4],5]).toMap()
 * // => TypeError: Iterator value 5 is not an entry object
 * @example <caption>toMap when no formatFn given</caption>
 * itrabble([[1,2],[3,4],5]).take(2).toMap()
 * // => new Map { 1 => 2, 3 => 4 }
 */
function toMap<T>(this: Itrabble<T>): Map<AsTuple<T>[0], AsTuple<T>[1]> {
  return new Map(this);
}

export default toMap;
