function *skip(count) {
  for (let elm of this) {
    if (count-- > 0) continue
    yield elm
  }
}

module.exports = skip
