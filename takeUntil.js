module.exports = function *takeUntil (fn) {
  const iterator = this[Symbol.iterator]()
  let isDone = false
  while(!isDone) {
    const { done, value} = iterator.next()
    isDone = done || fn(value)
    yield { done, value }
  }
}
