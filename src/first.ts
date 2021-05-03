import Itrabble from './itrabble';

/**
 * Get the first item.
 *
 * @generator first
 * @yields {*} item - the first item.
 *
 * @example <caption>Example usage of first</caption>
 * itrabble([1,2,3]).first()
 * // => 1
 */
function* first<T>(this: Itrabble<T>) {
  for (const item of this) {
    yield item as T;
    break;
  }
}

export default first;
