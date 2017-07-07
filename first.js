module.exports = function *first(n = 1) {
  const iterator = this[Symbol.iterator]()

  while(n > 0){
    yield iterator.next()
    n--
  }
}
