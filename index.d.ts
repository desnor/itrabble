type PredicateFunction<T, S extends T> = (value: T, index?: number) => value is S;
type UnaryFunction<T, R> = (value: T) => R;
type VariadicCallback<T> = (...values: T[]) => void;
type BinaryCallback<T> = (value: T, index: number) => void;
type Mappable<T> = T extends [infer K, infer V] ? [K, V] : never;
type MappableValue<T> = T extends Mappable<infer U> ? Map<U[0], U[1]> : never;
type IterableType<T, M extends MappableValue<T> = MappableValue<T>> =
  | Array<T>
  | Set<T>
  | M;
type IterableTypeBase = Array<any> | Set<any> | Map<any, any>;
type PipeableFunction<
  T,
  R = T,
  U extends Iterable<R> | Generator<R> = Generator<R>
> = (context: Iterable<T>) => U extends infer X ? X : U;

declare function isIterable<T>(value: any): value is Iterable<T>;
declare function hasBeenInvoked<T>(pipeline: any): pipeline is IterableType<T>;
declare function isObject<T>(value: any): value is Record<string, T>;

declare class Itrabble<T> implements Iterable<T> {
  new(context: Iterable<T>): Itrabble<T>;
  [Symbol.iterator](): IterableIterator<T>;
  pipe<A>(fn1: PipeableFunction<T, A>): Itrabble<A>;
  pipe<A, B>(
    fn1: PipeableFunction<T, A>,
    fn2: PipeableFunction<A, B>
  ): Itrabble<B>;
  pipe<A, B, C>(
    fn1: PipeableFunction<T, A>,
    fn2: PipeableFunction<A, B>,
    fn3: PipeableFunction<B, C>
  ): Itrabble<C>;
  pipe<A, B, C, D>(
    fn1: PipeableFunction<T, A>,
    fn2: PipeableFunction<A, B>,
    fn3: PipeableFunction<B, C>,
    fn4: PipeableFunction<C, D>
  ): Itrabble<D>;
  pipe<A, B, C, D, E>(
    fn1: PipeableFunction<T, A>,
    fn2: PipeableFunction<A, B>,
    fn3: PipeableFunction<B, C>,
    fn4: PipeableFunction<C, D>,
    fn5: PipeableFunction<D, E>
  ): Itrabble<E>;
  pipe<A, B, C, D, E, F>(
    fn1: PipeableFunction<T, A>,
    fn2: PipeableFunction<A, B>,
    fn3: PipeableFunction<B, C>,
    fn4: PipeableFunction<C, D>,
    fn5: PipeableFunction<D, E>,
    fn6: PipeableFunction<E, F>
  ): Itrabble<F>;
  pipe<A, B, C, D, E, F, G>(
    fn1: PipeableFunction<T, A>,
    fn2: PipeableFunction<A, B>,
    fn3: PipeableFunction<B, C>,
    fn4: PipeableFunction<C, D>,
    fn5: PipeableFunction<D, E>,
    fn6: PipeableFunction<E, F>,
    fn7: PipeableFunction<F, G>
  ): Itrabble<G>;
  pipe<A, B, C, D, E, F, G, H>(
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
  // pipe<R>(
  //   ...functions: PipeableFunction<T, R>[]
  // ): Itrabble<R>;
  toArray(): T[];
  toMap<T>(): T extends Mappable<T> ? Map<T[0], T[1]> : never;
  toSet(): Set<T>;
  first(): Itrabble<T>;
  filter<S extends T>(predicateFn: PredicateFunction<T, S>): Itrabble<S>;
  last(): Itrabble<T>;
}

declare module 'itrabble' {
  export function of<T>(...args: T[]): Itrabble<T>;
  export function from<T>(context: Iterable<T>): Itrabble<T>;
  export function from<T>(context: Record<string, T>): Itrabble<[string, T]>;
}

declare module 'itrabble/commonjs' {
  export function of<T>(...args: T[]): Itrabble<T>;
  export function from<T>(context: Iterable<T>): Itrabble<T>;
  export function from<T>(context: Record<string, T>): Itrabble<[string, T]>;
}

declare module 'itrabble/pipeable' {
  export function append<T, U>(...args: U[]): PipeableFunction<T, T | U>;
  export function concat<T, U>(args: Iterable<U>): PipeableFunction<T, T | U>;
  export function eachChunk<T>(
    n: number,
    callback: VariadicCallback<T>
  ): PipeableFunction<T>;
  export function filter<T, U extends T>(
    fn: PredicateFunction<T, U>
  ): PipeableFunction<T, U>;
  export function first<T>(): PipeableFunction<T>;
  export function forEach<T>(callback: BinaryCallback<T>): PipeableFunction<T>;
  export function last<T>(): PipeableFunction<T>;
  export function map<T, R>(fn: UnaryFunction<T, R>): PipeableFunction<T, R>;
  export function toArray<T>(): PipeableFunction<T, T, Array<T>>;
  export function toMap<T, M = MappableValue<T>>(): PipeableFunction<
    T,
    T,
    Map<M[0], M[1]>
  >;
  export function toSet<T>(): PipeableFunction<T, T, Set<T>>;
}

declare module 'itrabble/commonjs/pipeable' {
  // export function append<T, U>(...args: U[]): PipeableFunction<T, T | U>;
  // export function concat<T, U>(args: Iterable<U>): PipeableFunction<T, T | U>;
  // export function eachChunk<T>(n: number, callback: VariadicCallback<T>): PipeableFunction<T>;
  // export function filter<T>(fn: PredicateFunction<T>): PipeableFunction<S>;
  // export function first<T>(): PipeableFunction<T>;
  // export function forEach<T>(callback: BinaryCallback<T>): PipeableFunction<T>;
  // export function toArray<T>(): PipeableFunction<T, T, Array>;
  // export function toMap<T>(): PipeableFunction<T, T, Map>;
  // export function toSet<T>(): PipeableFunction<T, T, Set>;
}
