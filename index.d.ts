export as namespace Itrabble;
export = Itrabble;

declare module itrabble {
  export type Itrabble<T> = IterableIterator<T> & {
    pipe(...functions: Function[]): IterableIterator<T> | Iterable<T>;
  };

  export function of<T>(...args: T[]): Itrabble<T>;
  export function from<T>(context: Iterable<T>): Itrabble<T>;
}
