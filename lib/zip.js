function *zip(...its) {
  const iterators = [
    this[Symbol.iterator](),
    ...its.map(it => it[Symbol.iterator]())
  ]
  while (true) { // eslint-disable-line no-constant-condition
    let next = iterators.map(it => it.next())
    if (next.every(elm => elm.done)) break
    yield (next.map(elm => elm.value))
  }
}

module.exports = zip
