function *pipe(...fns) {
  const piped = (...initial) => fns.reduce((memo, fn) => fn(memo), ...initial)
  let i = 0
  for (const item of this) {
    yield piped(item, i)
    i++
  }
}

module.exports = pipe
