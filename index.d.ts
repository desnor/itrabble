type PredicateFunction<T> = (value: T, index: number) => boolean;
type VariadicCallback<T> = (...values: T[]) => void;

type BinaryCallback<T> = (value: T, index: number) => void;

export declare module itrabble {
  export type Itrabble<T extends any> = {
    [Symbol.iterator](): IterableIterator<T>;
    pipe(...functions: Function[]): IterableIterator<T> | Iterable<T>;
    toArray(): T[];
    toSet(): Set<T>;
    eachChunk(n: number, callback: VariadicCallback<T>): Itrabble<T> | never;
    filter(callback: PredicateFunction<T>): Itrabble<T>;
    first(): Itrabble<T>;
    forEach(callback: BinaryCallback<T>): Itrabble<T>;
  };

  export function of<T>(...args: T[]): Itrabble<T>;
  export function from<T>(context: Iterable<T>): Itrabble<T>;
}
