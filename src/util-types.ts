export type ItrabbleSource<T> = Iterable<T> | IterableIterator<T>;

export type PipeableFunction<T, R = T> = (
  context: Generator<T>
) => Generator<R>;
