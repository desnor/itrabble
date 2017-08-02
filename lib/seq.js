function *seq(n, offset=0) {
  let index = 0
  for (let elm of this) {
    if (index % n === offset) yield elm
    index += 1
  }
}

module.exports = seq
