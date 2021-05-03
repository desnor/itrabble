import eachChunk from './eachChunk';
import filter from './filter';
import first from './first';
import forEach from './forEach';
import last from './last';
import map from './map';
import reduce from './reduce';
import reject from './reject';
import scan from './scan';
import seq from './seq';
import skip from './skip';
import skipUntil from './skipUntil';
import skipWhile from './skipWhile';
import take from './take';
import takeUntil from './takeUntil';
import takeWhile from './takeWhile';
import zip from './zip';
import zipAll from './zipAll';
import zipWith from './zipWith';

import toArray from './toArray';
import toMap from './toMap';
import toSet from './toSet';

import { GetGeneratorType, ItrabbleSource, PipeableFunction, PiperFns } from './util-types';

const iterableMethods = {
  eachChunk,
  filter,
  first,
  forEach,
  last,
  map,
  reduce,
  reject,
  scan,
  seq,
  skip,
  skipUntil,
  skipWhile,
  take,
  takeUntil,
  takeWhile,
  zip,
  zipAll,
  zipWith,
};

const invocationMethods = {
  toArray,
  toMap,
  toSet,
};

type IterableMethods = typeof iterableMethods;
type InvocationMethods = typeof invocationMethods;

export interface Itrabble<T>
  extends Iterable<T>,
    IterableMethods,
    InvocationMethods {}

export class Itrabble<T> implements Itrabble<T> {
  private context: ItrabbleSource<T>;

  constructor(context: ItrabbleSource<T>) {
    this.context = context;
    if (!this || this.constructor !== Itrabble) return new Itrabble(context);
    this.addEnumerables(iterableMethods, invocationMethods);
  }

  *[Symbol.iterator]() {
    return (this.context as Iterable<T>)[Symbol.iterator].bind(this.context);
  }

  addEnumerables(enumerables: IterableMethods, invocations: InvocationMethods) {
    Object.entries(enumerables).forEach(([name, implementation]) => {
      Object.defineProperty(this, name, {
        value: this.buildIterator(implementation),
        enumerable: false,
      });
    });
    Object.entries(invocations).forEach(([name, method]) => {
      Object.defineProperty(this, name, {
        value: method.bind(this),
        enumerable: false,
      });
    });
  }

  buildIterator<K extends keyof IterableMethods, M extends IterableMethods[K], R extends GetGeneratorType<ReturnType<M>>>(
    iteratorFunc: M
  ) {
    return (...args: Parameters<M>) =>
      new Itrabble<R>({
        *[Symbol.iterator]() {
          return (iteratorFunc as any).bind(this, ...args);
        },
      });
  }

  pipe<A>(...iteratorFuncs: PiperFns<T, A>): Itrabble<A>;
  // pipe<A>(fn1: PipeableFunction<T, A>): Itrabble<A>;
  pipe<A, B>(
    ...iteratorFuncs: PiperFns<T, A, B>
    // fn1: PipeableFunction<T, A>,
    // fn2: FinalPipeableFunction<A, B>
  ): Itrabble<B>;
  pipe<A, B, C>(
    ...iteratorFuncs: PiperFns<T, A | B, C>
    // fn1: PipeableFunction<T, A>,
    // fn2: MidPipeableFunction<A, B>,
    // fn3: FinalPipeableFunction<B, C>
  ): Itrabble<C>;
  pipe<A, B, C, D>(
    ...iteratorFuncs: PiperFns<T, A | B | C, D>
  //   fn1: PipeableFunction<T, A>,
  //   fn2: MidPipeableFunction<A, B>,
  //   fn3: MidPipeableFunction<B, C>,
  //   fn4: MidPipeableFunction<C, D>
  ): Itrabble<D>;
  pipe<A, B, C, D, E>(
    ...iteratorFuncs: PiperFns<T, A | B | C | D, E>
    // fn1: PipeableFunction<T, A>,
    // fn2: MidPipeableFunction<A, B>,
    // fn3: MidPipeableFunction<B, C>,
    // fn4: MidPipeableFunction<C, D>,
    // fn5: FinalPipeableFunction<D, E>
  ): Itrabble<E>;
  // pipe<A, B, C, D, E, F>(
  //   fn1: PipeableFunction<T, A>,
  //   fn2: MidPipeableFunction<A, B>,
  //   fn3: MidPipeableFunction<B, C>,
  //   fn4: MidPipeableFunction<C, D>,
  //   fn5: MidPipeableFunction<D, E>,
  //   fn6: FinalPipeableFunction<E, F>
  // ): Itrabble<F>;
  // pipe<A, B, C, D, E, F, G>(
  //   fn1: PipeableFunction<T, A>,
  //   fn2: MidPipeableFunction<A, B>,
  //   fn3: MidPipeableFunction<B, C>,
  //   fn4: MidPipeableFunction<C, D>,
  //   fn5: MidPipeableFunction<D, E>,
  //   fn6: MidPipeableFunction<E, F>,
  //   fn7: FinalPipeableFunction<F, G>
  // ): Itrabble<G>;
  // pipe<A, B, C, D, E, F, G, H>(
  //   fn1: PipeableFunction<T, A>,
  //   fn2: MidPipeableFunction<A, B>,
  //   fn3: MidPipeableFunction<B, C>,
  //   fn4: MidPipeableFunction<C, D>,
  //   fn5: MidPipeableFunction<D, E>,
  //   fn6: MidPipeableFunction<E, F>,
  //   fn7: MidPipeableFunction<F, G>,
  //   fn8: FinalPipeableFunction<G, H>
  // ): Itrabble<H>;
  // pipe<A, B, C, D, E, F, G, H, I>(
  //   fn1: PipeableFunction<T, A>,
  //   fn2: MidPipeableFunction<A, B>,
  //   fn3: MidPipeableFunction<B, C>,
  //   fn4: MidPipeableFunction<C, D>,
  //   fn5: MidPipeableFunction<D, E>,
  //   fn6: MidPipeableFunction<E, F>,
  //   fn7: MidPipeableFunction<F, G>,
  //   fn8: MidPipeableFunction<G, H>,
  //   fn9: FinalPipeableFunction<H, I>
  // ): Itrabble<I>;

  pipe(this: Itrabble<T>, ...iteratorFuncs: PiperFns<T, unknown, unknown>) {
    const pipeline = piper(this, ...iteratorFuncs);
    return new Itrabble(pipeline);
  }
}

// type Pipe<T> = {
//   pipe<A>(...iteratorFuncs: PiperFns<T, A>): Itrabble<A>;
//   // pipe<A>(fn1: PipeableFunction<T, A>): Itrabble<A>;
//   pipe<A, B>(
//     ...iteratorFuncs: PiperFns<T, A, B>
//     // fn1: PipeableFunction<T, A>,
//     // fn2: FinalPipeableFunction<A, B>
//   ): Itrabble<B>;
//   pipe<A, B, C>(
//     ...iteratorFuncs: PiperFns<T, A | B, C>
//     // fn1: PipeableFunction<T, A>,
//     // fn2: MidPipeableFunction<A, B>,
//     // fn3: FinalPipeableFunction<B, C>
//   ): Itrabble<C>;
//   pipe<A, B, C, D>(
//     ...iteratorFuncs: PiperFns<T, A | B | C, D>
//   //   fn1: PipeableFunction<T, A>,
//   //   fn2: MidPipeableFunction<A, B>,
//   //   fn3: MidPipeableFunction<B, C>,
//   //   fn4: MidPipeableFunction<C, D>
//   ): Itrabble<D>;
//   pipe<A, B, C, D, E>(
//     ...iteratorFuncs: PiperFns<T, A | B | C | D, E>
//     // fn1: PipeableFunction<T, A>,
//     // fn2: MidPipeableFunction<A, B>,
//     // fn3: MidPipeableFunction<B, C>,
//     // fn4: MidPipeableFunction<C, D>,
//     // fn5: FinalPipeableFunction<D, E>
//   ): Itrabble<E>;
//   // pipe<A, B, C, D, E, F>(
//   //   fn1: PipeableFunction<T, A>,
//   //   fn2: MidPipeableFunction<A, B>,
//   //   fn3: MidPipeableFunction<B, C>,
//   //   fn4: MidPipeableFunction<C, D>,
//   //   fn5: MidPipeableFunction<D, E>,
//   //   fn6: FinalPipeableFunction<E, F>
//   // ): Itrabble<F>;
//   // pipe<A, B, C, D, E, F, G>(
//   //   fn1: PipeableFunction<T, A>,
//   //   fn2: MidPipeableFunction<A, B>,
//   //   fn3: MidPipeableFunction<B, C>,
//   //   fn4: MidPipeableFunction<C, D>,
//   //   fn5: MidPipeableFunction<D, E>,
//   //   fn6: MidPipeableFunction<E, F>,
//   //   fn7: FinalPipeableFunction<F, G>
//   // ): Itrabble<G>;
//   // pipe<A, B, C, D, E, F, G, H>(
//   //   fn1: PipeableFunction<T, A>,
//   //   fn2: MidPipeableFunction<A, B>,
//   //   fn3: MidPipeableFunction<B, C>,
//   //   fn4: MidPipeableFunction<C, D>,
//   //   fn5: MidPipeableFunction<D, E>,
//   //   fn6: MidPipeableFunction<E, F>,
//   //   fn7: MidPipeableFunction<F, G>,
//   //   fn8: FinalPipeableFunction<G, H>
//   // ): Itrabble<H>;
//   // pipe<A, B, C, D, E, F, G, H, I>(
//   //   fn1: PipeableFunction<T, A>,
//   //   fn2: MidPipeableFunction<A, B>,
//   //   fn3: MidPipeableFunction<B, C>,
//   //   fn4: MidPipeableFunction<C, D>,
//   //   fn5: MidPipeableFunction<D, E>,
//   //   fn6: MidPipeableFunction<E, F>,
//   //   fn7: MidPipeableFunction<F, G>,
//   //   fn8: MidPipeableFunction<G, H>,
//   //   fn9: FinalPipeableFunction<H, I>
//   // ): Itrabble<I>;
//   }
// type PipeResult<T extends PiperFns<any, any>> = T extends PiperFns<any, any> ? Last<T> extends Generator<infer P> ? P : never : never;

// type PipeIn<T extends PiperFns<any, any>> = T extends PiperFns<infer A, any> ?
// type PipeInOut<T extends PiperFns<any, any>> =

// type LastPiperFn<T> = Last<PiperFns<1, 3>>
// type LastPiperFnReturnValue = GeneratorValue<ReturnType<LastPiperFn>>
// type PipeInput<T extends PiperFns<any, any>> = ReturnType<First<T>>;
// type PipeResult<T extends PiperFns<any, any>> = ReturnType<Last<T>>;
// type UnwrappedPipeValue<T extends IterableIterator<PipeResult<any>>> = T extends IterableIterator<PipeResult<any>> ? T : never;

// type FNS = PiperFns<1, unknown>;
// type OUT = PipeResult<FNS>;
// type IN = PipeInput<FNS>;

// type last = Last<[1, 2]>
// type mid = Mid<[1, 2, 3]>
// type two = Mid<[1, 2, string, 3, 4, 5, 6]>
// const pipe: Pipe<any> = (this: Itrabble<any>, ...iteratorFuncs: PiperFns<T>) => {
//   const pipeline = (iteratorFuncs as any).reduce((memo: Generator<T> | Itrabble<T>, fn: PipeableFunction<T>) => fn(memo), this);
//   return new Itrabble(pipeline);
// }

function piper<T, R>(input: Itrabble<T>, ...fns: PiperFns<T, unknown, R>): Generator<R> {
  return (fns as any).reduce(pipeReducer, input);
}

function pipeReducer<T, R>(
  memo: IterableIterator<T>,
  func: PipeableFunction<T, R>
) {
  return func(memo);
}

// const _res = new Itrabble(['1', '2', '3']).pipe(
//   function*(ctx) {
//     for (const item of ctx) {
//       yield parseInt(item, 10);
//     }
//   },
//   function*(ctx) {
//     for (const item of ctx) {
//       yield item > 2;
//     }
//   }
// );

// console.log('res:', _res)
export default Itrabble;
