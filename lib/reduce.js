function *reduce(callback, memo) {
  for (let elm of this) {
    memo = callback(memo, elm)
  }
  yield memo
}

module.exports = reduce
