const { forEach, map, filter, Itrabble } = require('./index-2')

const filterEvens = filter(x => x % 2 == 1)
const triple      = map(x => x * 3)
const subtractTen = map(x => x - 10)
const logger      = forEach(x => console.log(x))
const counter     = forEach((x, i) => console.log(`On item ${i}: ${x}`))

const list = Itrabble([4, 23, 52, 72, 73, 74, 75])
                (counter)
                (triple)
                (logger)
                (filterEvens)
                (subtractTen)
                (logger)

console.log(list.toArray() || [...list])
