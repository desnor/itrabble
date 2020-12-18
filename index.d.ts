type PredicateFunction<T> = (value: T, index: number) => boolean;
type UnaryFunction<T, R> = (value: T) => R;
type VariadicCallback<T> = (...values: T[]) => void;
type BinaryCallback<T> = (value: T, index: number) => void;
type Mappable<T> = T extends [infer K, infer V] ? [K, V] : never
type IterableType<T> =
  | Array<T>
  | Set<T>
  | Mappable<T>;
type PipeableFunction<T, R, U extends Iterable = Generator> = (context: Iterable<T>) => U<R>;

declare class Itrabble<T> extends Iterable<T> {
  [Symbol.iterator](): Iterable<T>;
  pipe<A>(
    op1: PipeableFunction<T, A>
  ): Itrabble<A>;
  pipe<A, B>(
    op1: PipeableFunction<T, A>,
    op2: PipeableFunction<A, B>
  ): ReturnType<typeof op2> extends Generator<B> ? Itrabble<B> : ReturnType<typeof op2>;
  pipe<A, B, C>(
    op1: PipeableFunction<T, A>,
    op2: PipeableFunction<A, B>,
    op3: PipeableFunction<B, C>
  ): Itrabble<C>;
  // pipe<R>(
  //   ...functions: PipeableFunction<T, R>[]
  // ): Itrabble<R>;
  toArray(): T[];
  toMap<T>(): T extends Mappable<T> ? Map<T[0], T[1]> : never;
  toSet(): Set<T>;
  eachChunk(n: number, callback: VariadicCallback<T>): Itrabble<T>;
  filter(callback: PredicateFunction<T>): Itrabble<T>;
  first(): Itrabble<T>;
  forEach(callback: BinaryCallback<T>): Itrabble<T>;
}

declare module "itrabble" {
  export function of<T>(...args: T[]): Itrabble<T>;
  export function from<T>(context: Iterable<T> | Record<string, T>): Itrabble<T>;
}

declare module "itrabble/pipeable" {
  export function append<T, U>(...args: U[]): PipeableFunction<T, T | U>;
  export function concat<T, U>(args: Iterable<U>): PipeableFunction<T, T | U>;
  export function eachChunk<T>(n: number, callback: VariadicCallback<T>): PipeableFunction<T, T>;
  export function toArray<T>(): PipeableFunction<T, T, Array>;
  export function toMap<T>(): PipeableFunction<T, T, Map>;
  export function toSet<T>(): PipeableFunction<T, T, Set>;
}
