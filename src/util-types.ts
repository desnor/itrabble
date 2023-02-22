export type ItrabbleSource<T> = Iterable<T> | IterableIterator<T>;

export type PipeableFunction<T extends unknown, R extends unknown = T> = (
  context: Generator<T>
) => Generator<R>;
