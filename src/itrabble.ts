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

import { hasBeenInvoked } from './helpers';
import { Mappable } from './util-types';

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

type IterableMethod = typeof iterableMethods;
type InvocationMethod = typeof invocationMethods;

export interface Itrabble<T>
  extends Iterable<T>,
    IterableMethod,
    InvocationMethod {}

export class Itrabble<T> implements Itrabble<T> {
  private context: Iterable<T>;

  constructor(context: Iterable<T>) {
    this.context = context;
    if (!this || this.constructor !== Itrabble) return new Itrabble(context);
    this.addEnumerables(iterableMethods, invocationMethods);
  }

  *[Symbol.iterator]() {
    return this.context[Symbol.iterator].bind(this.context);
  }

  addEnumerables(
    enumerables: { [name: string]: (...args: any[]) => Generator<any> },
    invocations: { [M in keyof InvocationMethod]: InvocationMethod[M] }
  ) {
    Object.entries(enumerables).forEach(([name, implementation]) => {
      Object.defineProperty(this, name, {
        value: this.buildIterator(implementation),
      });
    });
    Object.entries(invocations).forEach(([name, method]) => {
      Object.defineProperty(this, name, {
        value: method.bind(this),
      });
    });
  }

  buildIterator(iteratorFunc: (...args: any[]) => Generator<T>) {
    return (...args: Parameters<typeof iteratorFunc>) =>
      new Itrabble({
        [Symbol.iterator]: iteratorFunc.bind(this, ...args),
      });
  }

  pipe(...iteratorFuncs) {
    const pipeline = iteratorFuncs.reduce(
      (collectedPipeline, iteratorFunc) => iteratorFunc(collectedPipeline),
      this
    );

    if (hasBeenInvoked(pipeline)) return pipeline;

    return new Itrabble(pipeline);
  }
}

export default Itrabble;
