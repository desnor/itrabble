function *take(count, offset=0) {
  for (let elm of this) {
    if (offset-- > 0) continue
    if (count-- === 0) break
    yield elm
  }
}

module.exports = take
