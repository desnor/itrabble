function toMap(formatFn) {
  if (typeof formatFn !== 'undefined') {
    return new Map(formatFn(this))
  }
  return new Map(this)
}

module.exports = toMap
