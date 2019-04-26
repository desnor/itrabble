function map(callback) {
  return function* (context) {
    let index = 0
    for (const item of context) {
      yield callback(item, index)
      index += 1
    }
  }
}

module.exports = map
