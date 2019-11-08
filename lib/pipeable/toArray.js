export function toArray() {
  return function (context) {
    return Array.from(context)
  }
}
