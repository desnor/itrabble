import Itrabble from './itrabble';
import { ItrabbleSource } from './util-types';

/**
 * Accepts any iterable as a source.
 * @param {ItrabbleSource<T>} source
 */
export function from<T>(source: ItrabbleSource<T>) {
  if (source instanceof Itrabble) return source;

  return new Itrabble(source);
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

export { Itrabble };
