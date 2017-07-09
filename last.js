module.exports = function *last() {
  const iterator = this[Symbol.iterator]()

  let isDone = false
  let lastVal = null
  while(!isDone) {
    const { done, value } = iterator.next()
    isDone = done

    if(isDone){
      yield { done: isDone, value: lastVal }
    }
    lastVal = value
  }
}
