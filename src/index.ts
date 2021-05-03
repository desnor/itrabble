import Itrabble from './itrabble';
import { isIterable, isObject } from './helpers';
import { ItrabbleSource } from './util-types';

/**
 * Accepts an iterable as a source. Alternatively if provided a plain object
 * it will return an itrabble instance over the entries of the given object
 * @param {IterableSource<T> | {}} source
 */
export function from<T>(source: ItrabbleSource<T>) {
  if (source instanceof Itrabble) return source;

  if (isIterable(source)) return new Itrabble(source);

  if (isObject(source)) {
    return new Itrabble(Object.entries(source));
  }

  return of(source);
}

/**
 * Accepts any number of values over which it will create and return an itrabble
 * instance
 *
 * @param  {...*} values
 */
export function of<T>(...values: T[]) {
  return new Itrabble(values);
}
