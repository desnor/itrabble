export function hasBeenInvoked(pipeline) {
  return [Array, Map, Set].some(klass => pipeline instanceof klass)
}

export function isObject(value) {
  return value !== null && typeof value === 'object'
}

export function isIterable(value) {
  return Boolean(value[Symbol.iterator])
}
