function toArray() {
  return function (context) {
    return Array.from(context)
  }
}

export default toArray
