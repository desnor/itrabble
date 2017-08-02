function *takeUntil(callback) {
  let taking = true
  for (let elm of this) {
    taking = taking && !callback(elm)
    if (!taking) break
    yield elm
  }
}

module.exports = takeUntil
