import Itrabble from './itrabble';

export type AsTuple<
  T,
  U extends Mappable<T> = Mappable<T>,
  K extends U[0] = U[0],
  V extends U[1] = U[1]
> = K extends string | number ? [K, V] : never;
export type Mappable<T> = T extends [infer K, infer V] ? [K, V] : never;
export type AsMap<T> = Map<Mappable<T>[0], Mappable<T>[1]>;
export type IterableType<T> = Array<T> | AsMap<T> | Set<T>;
export type ItrabbleSource<T> =
  | Itrabble<T>
  | Iterable<T>
  | IterableIterator<T>
  | AsMap<T>
  | { [Symbol.iterator](): Iterator<T> | IterableIterator<T> };

export type PipeableFunction<T, R extends unknown = T> = (
  context: IterableIterator<T>
) => Generator<R extends infer U ? U : R>;

// export type GetPipeType<T extends any, FS> = FS extends GetPipe<T, PipeableFunction<infer I, infer R>[]> ? GetPipe<Text, FS>: never;

export type GetPipe<I, T extends any[]> = T extends [PipeableFunction<I, infer R>] ? SinglePipe<I, R>
  : T extends [PipeableFunction<I, infer M>, PipeableFunction<infer M, infer R>] ? DualPipe<I, M, R>
  : T extends [
    PipeableFunction<I, infer M>,
    ...PipeableFunction<infer M, infer MR>[],
    PipeableFunction<infer MR, infer R>
  ] ? [
    PipeableFunction<I, M>,
    // ...GetPipe<M, PipeableFunction<M,MR>[]>,
    ...GetPipe<M, Mid<T>>,
    PipeableFunction<MR, R>
  ] : never;

type SinglePipe<T, R> = [PipeableFunction<T, R>];
type DualPipe<T, M, R> = [PipeableFunction<T, M>, PipeableFunction<M, R>];
type MultiPipe<T, M, R> = [
      PipeableFunction<T, M>,
      ...PipeableFunction<M, M>[],
      PipeableFunction<M, R>
    ];

export type PiperFns<T, M extends unknown = T, R extends unknown = M> =
  | SinglePipe<T, R>
  | DualPipe<T, M, R>
  | MultiPipe<T, M, R>;

export type PiperFnsCollection<I, TS extends PipeableFunction<any, any>[]> = GetPipe<I, TS>
// export type PiperFnsCollection<TS extends any[]> = PiperFns<First<TS>, Mid<TS>, Last<TS>>

type Res = GetPipe<string, [PipeableFunction<string, number>, PipeableFunction<number, string>]>
// export type PiperFns<T, M extends unknown = T, R extends unknown = M> = R extends infer RR ? M extends infer MM ?
//   | [PipeableFunction<T, RR>]
//   | [PipeableFunction<T, MM>, PipeableFunction<MM, RR>]
//   | [
//       PipeableFunction<T, MM>,
//       ...PipeableFunction<MM, MM>[],
//       PipeableFunction<MM, RR>
//     ] : never : never;

export type GetGeneratorType<T extends Generator<any>> = T extends Generator<infer U> ? U : never;

export type DerivedPipelineFns<T extends PiperFns<any, any, any>> = T extends PiperFns<any, any, any> ? [FirstInPipe<T>, ...MidInPipe<T>, LastInPipe<T>] : never;
export type FirstInPipe<T> = T extends PiperFns<any, any, any> ? First<T> : never;
export type MidInPipe<T> = T extends PiperFns<any, any, any> ? Mid<T> : never;
export type LastInPipe<T> = T extends PiperFns<any, any, any> ? Last<T> : never;


export type First<T extends any[]> = T extends [infer F, ...any] ? F : never
export type Mid<T extends any[]> = T extends [any, ...infer M, any] ? M : never
export type Last<T extends any[]> = T extends [...any, infer L] ? L : never
