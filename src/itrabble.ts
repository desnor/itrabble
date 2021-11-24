import eachChunk from './eachChunk.js';
import filter from './filter.js';
import first from './first.js';
import forEach from './forEach.js';
import last from './last.js';
import map from './map.js';
import reduce from './reduce.js';
import reject from './reject.js';
import scan from './scan.js';
import seq from './seq.js';
import skip from './skip.js';
import skipUntil from './skipUntil.js';
import skipWhile from './skipWhile.js';
import take from './take.js';
import takeUntil from './takeUntil.js';
import takeWhile from './takeWhile.js';
import {
  GetGeneratorType,
  ItrabbleSource,
  PipeableFunction,
} from './util-types';
import zip from './zip.js';
import zipAll from './zipAll.js';
import zipWith from './zipWith.js';

const iterableMethods = {
  eachChunk,
  filter,
  first,
  forEach,
  last,
  map,
  reduce,
  reject,
  scan,
  seq,
  skip,
  skipUntil,
  skipWhile,
  take,
  takeUntil,
  takeWhile,
  zip,
  zipAll,
  zipWith,
} as const;

export type IterableMethods = typeof iterableMethods;

export type ItrabbleBoundMethods = {
  [M in keyof IterableMethods]: (
    ...args: Parameters<IterableMethods[M]>
  ) => Itrabble<GetGeneratorType<ReturnType<IterableMethods[M]>>>;
};

export interface Itrabble<T>
  extends IterableIterator<T>,
    ItrabbleBoundMethods {}

export class Itrabble<T> implements Itrabble<T> {
  constructor(context: ItrabbleSource<T>) {
    this.addEnumerables(iterableMethods);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    (this as any)[Symbol.iterator] = context[Symbol.iterator].bind(context);
  }

  private addEnumerables(this: Itrabble<T>, iterables: IterableMethods) {
    Object.entries(iterables).forEach(([name, implementation]) => {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      (this as any)[name] = this.buildIterator(implementation);
    });
  }

  private buildIterator<
    K extends keyof IterableMethods,
    M extends IterableMethods[K],
    R extends GetGeneratorType<ReturnType<M>>
  >(this: Itrabble<T>, iteratorFunc: M) {
    return (...args: Parameters<M>) =>
      new Itrabble<R>({
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        [Symbol.iterator]: (iteratorFunc as any).bind(this, ...args),
      });
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
   * itrabble([1,2,3,4,5]).map(x => x * x).take(4).toArray()
   * // => an array: [1, 4, 9, 16]
   */
  toArray() {
    return Array.from(this);
  }

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
  toMap<U extends [unknown, unknown] | readonly [unknown, unknown]>(
    this: Itrabble<U>
  ): Map<U[0], U[1]> {
    return new Map(this);
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
   * itrabble([1,2,3,4,5,4,3,2,1]).toSet()
   * // => Set { 1, 2, 3, 4, 5}
   * @example <caption>toSet invokes transforms before converting into Set</caption>
   * itrabble([[1,2],[3,4],[5,4],[3,2],1]).take(2).toSet()
   * // => Set { [ 1, 2 ], [ 3, 4 ] }
   */
  toSet() {
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
