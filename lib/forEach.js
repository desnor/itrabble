function *forEach(callback) {
  let index = 0
  for (let elm of this) {
    callback(elm, index++)
    yield elm
  }
}

module.exports = forEach
