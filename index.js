take(['a','b','c'], 2)
take(new Map([['a', 'a'],['b', 'b'], ['c', 'c']]), 2)

function take(iterable, n) {
  const iterator = iterable[Symbol.iterator]()
  const result = []
  while(n > 0) {
    result.push(iterator.next().value)
    n--
  }
  console.log(result)
  return result
}
