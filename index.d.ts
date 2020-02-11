type PredicateFunction<T> = (value: T, index: number) => boolean;
type UnaryFunction<T, R> = (value: T) => R;
type VariadicCallback<T> = (...values: T[]) => void;
type BinaryCallback<T> = (value: T, index: number) => void;
type IterableType<T> =
  | Array<T>
  | Set<T>
  | Map<K extends keyof T ? infer K : never, T>;

declare module "itrabble" {
  class Itrabble<T extends any> {
    [Symbol.iterator](): IterableIterator<T>;
    // pipe(
    //   ...functions: ((item: T) => R extends any)[]
    // ): (context: IterableIterator<T>) => Itrabble<R> | IterableType<R>;
    pipe<A>(
      op1: UnaryFunction<T, A>
    ): (context: IterableIterator<T>) => Itrabble<A> | IterableType<A>;
    pipe<A, B>(
      op1: UnaryFunction<T, A>,
      op2: UnaryFunction<A, B>
    ): (context: IterableIterator<T>) => Itrabble<B> | IterableType<B>;
    pipe<A, B, C>(
      op1: UnaryFunction<T, A>,
      op2: UnaryFunction<A, B>,
      op3: UnaryFunction<B, C>
    ): (context: IterableIterator<T>) => Itrabble<C> | IterableType<C>;
    toArray(): T[];
    toMap<T, K extends keyof T>(): Map<K, T> | Map<T, K>;
    toSet(): Set<T>;
    eachChunk(n: number, callback: VariadicCallback<T>): Itrabble<T> | never;
    filter(callback: PredicateFunction<T>): Itrabble<T>;
    first(): Itrabble<T>;
    forEach(callback: BinaryCallback<T>): Itrabble<T>;
  }

  export function of<T>(...args: T[]): Itrabble<T>;
  export function from<T>(context: Iterable<T>): Itrabble<T>;
}
