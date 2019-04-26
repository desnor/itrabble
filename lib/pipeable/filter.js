function filter(predicateFn) {
  return function* (context) {
    let index = 0
    for (const item of context) {
      if (predicateFn(item, index++)) {
        yield item
      }
    }
  }
}

module.exports = filter
