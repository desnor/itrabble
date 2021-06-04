import Itrabble from './itrabble';

export type ItrabbleSource<T> = Itrabble<T> | Iterable<T> | IterableIterator<T>;

export type PipeableFunction<T extends unknown, R extends unknown = T> = (
  context: Generator<T>
) => Generator<R>;

export type GetGeneratorType<T extends Generator<unknown>> =
  T extends Generator<infer U> ? U : never;
