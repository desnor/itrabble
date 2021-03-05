export function hasBeenInvoked(pipeline: any) {
  return [Array, Map, Set].some(klass => pipeline instanceof klass);
}

export function isObject(value: any) {
  return value !== null && typeof value === 'object';
}

export function isIterable(value: any) {
  return Boolean(value[Symbol.iterator]);
}
