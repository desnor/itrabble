module.exports = function *last(n = 1) {
  const start = this.length - n
  const iterator = this.slice(start, start + n)[Symbol.iterator]()
  while(n > 0){
    yield iterator.next()
    n--
  }
}
