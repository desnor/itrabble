module.exports = function *take(n) {
  const iterator = this[Symbol.iterator]()

  while(n > 0){
    yield iterator.next()
    n--
  }
}
