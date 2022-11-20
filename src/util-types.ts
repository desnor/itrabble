import Itrabble from './itrabble';

export type ItrabbleSource<T> = Iterable<T> | IterableIterator<T>;

export type PipeableFunction<T extends unknown, R extends unknown = T> = (
  context: Generator<T>
) => Generator<R>;

export type BoundItrabbleMethod<
  T,
  A extends any[],
  F extends (this: Itrabble<T>, ...args: A) => Generator<any>
> = F extends (this: Itrabble<T>, ...args: Parameters<F>) => Generator<infer R>
  ? (this: Itrabble<T>, ...args: Parameters<F>) => Itrabble<R>
  : never;

export type GetGeneratorType<T extends Generator<any>> = T extends Generator<
  infer U
>
  ? U
  : never;

export type GetGeneratorSourceReturnType<T> = T extends (
  ...args: any[]
) => Generator<any>
  ? GetGeneratorType<ReturnType<T>>
  : T extends Generator<any>
  ? GetGeneratorType<T>
  : never;

export type GeneratorAsItrabble<T> = Itrabble<GetGeneratorSourceReturnType<T>>;
