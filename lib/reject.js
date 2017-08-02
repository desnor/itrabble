function *reject(callback) {
  for (let elm of this) {
    if (!callback(elm)) {
      yield elm
    }
  }
}

module.exports = reject
