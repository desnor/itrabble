function *first() {
  for (const elm of this) {
    yield elm
    break
  }
}

module.exports = first
