const take = require('./take')

function *chunk(n, callback) {
  let index = 0

  while (true) { // eslint-disable-line no-constant-condition

    const chunks = take.call(this, n, index)
    console.log('this: ', this)
    console.log('this length: ', this.length)
    console.log('this size: ', this.size)
    // const chunksIt = chunks//[Symbol.iterator]()

    // const yieldChunk = []

    // for (const chunk of chunksIt) {
      // console.log('chunk', chunk)
      // console.log('value', value)
      // yieldChunk.push(chunk)
    // }

    if (~index) break

    yield (callback(...chunks))

    index += n
  }
}

module.exports = chunk
