import { IterableType } from '../util-types';

export function hasBeenInvoked<T>(pipeline: any): pipeline is IterableType<T> {
  return [Array, Map, Set].some(klass => pipeline instanceof klass);
}

export function isObject(value: any): value is {} {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function isIterable<T>(value: any): value is Iterable<T> {
  return Boolean(value[Symbol.iterator]);
}
