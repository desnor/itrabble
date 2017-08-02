function *last() {
  let elm
  for (elm of this) {} // eslint-disable-line no-empty
  yield elm
}

module.exports = last
