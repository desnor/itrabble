const take = require('./take')

function *eachSlice(n, callback) {
  let index = 0
  let slice = [...this]

  while (true) {
    slice = take.call(this, n, index)

    callback(...slice)
    for (const item of slice) {
      yield item
      index ++
    }
  }
}

module.exports = eachSlice
