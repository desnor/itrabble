import Itrabble from '../itrabble';

export function isIterable<T>(
  value: any
): value is Itrabble<T> | Iterable<T> | IterableIterator<T> {
  return Boolean(value[Symbol.iterator]);
}
