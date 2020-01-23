type PredicateFunction<T> = (value: T, index: number) => boolean;
type UnaryFunction<T, R> = (value: T) => R;
type VariadicCallback<T> = (...values: T[]) => void;
type BinaryCallback<T> = (value: T, index: number) => void;

export namespace itrabble {
  export type Itrabble<T extends any> = {
    [Symbol.iterator](): IterableIterator<T>;
    pipe(
      ...functions: ((item: T) => any)[]
    ): IterableIterator<any> | Iterable<any>;
    toArray(): T[];
    toMap<K extends keyof T>(): Map<K, T> | Map<T, K>;
    toSet(): Set<T>;
    eachChunk(n: number, callback: VariadicCallback<T>): Itrabble<T> | never;
    filter(callback: PredicateFunction<T>): Itrabble<T>;
    first(): Itrabble<T>;
    forEach(callback: BinaryCallback<T>): Itrabble<T>;
  };

  export function of<T>(...args: T[]): Itrabble<T>;
  export function from<T>(context: Iterable<T>): Itrabble<T>;
}

// }

// const a = Itrabble.from([1, 2, 3, 4]).pipe(
//   x => x * 2,
//   x => x * 3
// );
