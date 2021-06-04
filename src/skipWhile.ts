import Itrabble from './itrabble';

/**
 * Skips items while callback returns true, yielding each thereafter.
 * (inverse of @takeWhile)
 *
 * @generator skipWhile
 * @param {predicateFnUnary} callback - function to apply each item and its index to.
 * @yields {*} item - the next item.
 *
 * @example <caption>skipWhile an item is less than 3</caption>
 * itrabble([1,2,3,4,5,4,3,2,1]).skipWhile(item => item < 3)
 * // => 4, 5, 4, 3, 2, 1
 */
function* skipWhile<T>(
  this: Itrabble<T>,
  callback: (item: T, index: number) => boolean
) {
  let i = 0;
  let skipping = true;
  for (const item of this) {
    skipping = skipping && callback(item, i++);
    if (!skipping) yield item;
  }
}

export default skipWhile;
