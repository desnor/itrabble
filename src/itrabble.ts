import { ItrabbleSource, PipeableFunction } from './util-types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Itrabble<T> extends IterableIterator<T> {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class Itrabble<T> implements Itrabble<T> {
  constructor(context: ItrabbleSource<T>) {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    (this as any)[Symbol.iterator] = context[Symbol.iterator].bind(context);
  }

  /**
   * Get the first item.
   *
   * @function first
   * @returns {*} item - the first item.
   *
   * @example <caption>Example usage of first</caption>
   * itrabble([1,2,3]).first
   * // => 1
   */
  get first(): T | undefined {
    for (const item of this) {
      return item;
    }
    return;
  }

  /**
   * Get the last item. -- WARNING: This will iterate through collection
   * until it reaches the end, so do not use on an infinite sequence!
   *
   * @function last
   * @returns {*} item - the last item.
   *
   * @example <caption>Example usage of last</caption>
   * itrabble([1,2,3]).last
   * // => 3
   */
  get last(): T | undefined {
    let item;
    // eslint-disable-next-line no-empty
    for (item of this) {
    }
    return item;
  }

  /**
   * Converts iterable sequence into an Array, invoking any prior transforms.
   *
   * @function toArray
   * @returns {Array} - the iterated context as an array.
   *
   * @example <caption>an `itrabble` is an iterable over the given values</caption>
   * itrabble([1,2,3,4,5])
   * // => an iterable sequence yielding: { 1, 2, 3, 4, 5 }
   * @example <caption>toArray invokes itrabble sequence, converting result
   * into an array</caption>
   * itrabble([1,2,3,4,5]).pipe(map(x => x * x), take(4)).toArray
   * // => an array: [1, 4, 9, 16]
   */
  get toArray() {
    return Array.from(this);
  }

  /**
   * Converts iterable sequence into a Map, invoking any prior transforms.
   *
   * @function toMap
   * @returns {Map} - the iterated context invoked and formatted into a Map.
   *
   * @example <caption>an `itrabble` is an iterable over the given values</caption>
   * itrabble([[1,2],[3,4],5])
   * // => an iterable sequence yielding: { [1, 2], [3, 4], 5 }
   * @example <caption>calling toMap on a malformed map shape throws error</caption>
   * itrabble([[1,2],[3,4],5]).toMap
   * // => TypeError: Iterator value 5 is not an entry object
   * @example <caption>toMap returns Map of itrabble sequence pairs</caption>
   * itrabble([[1,2],[3,4],5]).pipe(take(2)).toMap
   * // => new Map { 1 => 2, 3 => 4 }
   */
  get toMap(): T extends [infer K, infer V] ? Map<K, V> : never {
    return new Map(this as never) as never;
  }

  /**
   * Converts iterable sequence into a Set, invoking any prior transforms.
   *
   * @function toSet
   * @returns {Set} - the iterated context invoked and formatted into a Set.
   *
   * @example <caption>an `itrabble` is an iterable over the given values</caption>
   * itrabble([1,2,3,4,5,4,3,2,1])
   * // => an iterable sequence yielding: { 1, 2, 3, 4, 5, 4, 3, 2, 1 }
   * @example <caption>toSet converts straight into a Set</caption>
   * itrabble([1,2,3,4,5,4,3,2,1]).toSet
   * // => Set { 1, 2, 3, 4, 5}
   * @example <caption>toSet invokes transforms before converting into Set</caption>
   * itrabble([[1,2],[3,4],[5,4],[3,2],1]).pipe(take(2)).toSet
   * // => Set { [ 1, 2 ], [ 3, 4 ] }
   */
  get toSet() {
    return new Set(this);
  }

  pipe<A>(this: IterableIterator<T>, fn1: PipeableFunction<T, A>): Itrabble<A>;
  pipe<A, B>(
    this: IterableIterator<T>,
    fn1: PipeableFunction<T, A>,
    fn2: PipeableFunction<A, B>
  ): Itrabble<B>;
  pipe<A, B, C>(
    this: IterableIterator<T>,
    fn1: PipeableFunction<T, A>,
    fn2: PipeableFunction<A, B>,
    fn3: PipeableFunction<B, C>
  ): Itrabble<C>;
  pipe<A, B, C, D>(
    this: IterableIterator<T>,
    fn1: PipeableFunction<T, A>,
    fn2: PipeableFunction<A, B>,
    fn3: PipeableFunction<B, C>,
    fn4: PipeableFunction<C, D>
  ): Itrabble<D>;
  pipe<A, B, C, D, E>(
    this: IterableIterator<T>,
    fn1: PipeableFunction<T, A>,
    fn2: PipeableFunction<A, B>,
    fn3: PipeableFunction<B, C>,
    fn4: PipeableFunction<C, D>,
    fn5: PipeableFunction<D, E>
  ): Itrabble<E>;
  pipe<A, B, C, D, E, F>(
    this: IterableIterator<T>,
    fn1: PipeableFunction<T, A>,
    fn2: PipeableFunction<A, B>,
    fn3: PipeableFunction<B, C>,
    fn4: PipeableFunction<C, D>,
    fn5: PipeableFunction<D, E>,
    fn6: PipeableFunction<E, F>
  ): Itrabble<F>;
  pipe<A, B, C, D, E, F, G>(
    this: IterableIterator<T>,
    fn1: PipeableFunction<T, A>,
    fn2: PipeableFunction<A, B>,
    fn3: PipeableFunction<B, C>,
    fn4: PipeableFunction<C, D>,
    fn5: PipeableFunction<D, E>,
    fn6: PipeableFunction<E, F>,
    fn7: PipeableFunction<F, G>
  ): Itrabble<G>;
  pipe<A, B, C, D, E, F, G, H>(
    this: IterableIterator<T>,
    fn1: PipeableFunction<T, A>,
    fn2: PipeableFunction<A, B>,
    fn3: PipeableFunction<B, C>,
    fn4: PipeableFunction<C, D>,
    fn5: PipeableFunction<D, E>,
    fn6: PipeableFunction<E, F>,
    fn7: PipeableFunction<F, G>,
    fn8: PipeableFunction<G, H>
  ): Itrabble<H>;
  pipe<A, B, C, D, E, F, G, H, I>(
    this: IterableIterator<T>,
    fn1: PipeableFunction<T, A>,
    fn2: PipeableFunction<A, B>,
    fn3: PipeableFunction<B, C>,
    fn4: PipeableFunction<C, D>,
    fn5: PipeableFunction<D, E>,
    fn6: PipeableFunction<E, F>,
    fn7: PipeableFunction<F, G>,
    fn8: PipeableFunction<G, H>,
    fn9: PipeableFunction<H, I>
  ): Itrabble<I>;
  pipe<A, B, C, D, E, F, G, H, I, J>(
    this: IterableIterator<T>,
    fn1: PipeableFunction<T, A>,
    fn2: PipeableFunction<A, B>,
    fn3: PipeableFunction<B, C>,
    fn4: PipeableFunction<C, D>,
    fn5: PipeableFunction<D, E>,
    fn6: PipeableFunction<E, F>,
    fn7: PipeableFunction<F, G>,
    fn8: PipeableFunction<G, H>,
    fn9: PipeableFunction<H, I>,
    fn10: PipeableFunction<I, J>
  ): Itrabble<J>;
  pipe(
    this: IterableIterator<T>,
    ...iteratorFuncs: PipeableFunction<T, unknown>[]
  ) {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const pipeline = iteratorFuncs.reduce((memo: any, fn) => fn(memo), this);

    return new Itrabble(pipeline);
  }
}

export default Itrabble;
