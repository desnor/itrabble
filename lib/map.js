function *map(callback) {
  let index = 0
  for (let elm of this) {
    yield callback(elm, index)
    index += 1
  }
}

module.exports = map
