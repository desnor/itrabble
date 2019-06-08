function toArray() {
  return function (context) {
    return Array.from(context)
  }
}

module.exports = toArray
