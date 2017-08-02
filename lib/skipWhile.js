function *skipWhile(callback) {
  let skipping = true
  for (let elm of this) {
    skipping = skipping && callback(elm)
    if (!skipping) yield elm
  }
}

module.exports = skipWhile
