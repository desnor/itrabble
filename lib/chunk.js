const seq = require('./seq')
const skip = require('./skip')

function *chunk(n, callback) {
  let total = n
  let iterators = []
  while (n-- > 0) {
    iterators.push(skip.call(this, n))
  }
  while (true) { // eslint-disable-line no-constant-condition
    let next = iterators.map(it => it.next())
    console.log('next: ', next)
    if (next.every(elm => elm.done)) break
    yield (callback(...next.map(elm => elm.value)))
  }
}

module.exports = chunk
