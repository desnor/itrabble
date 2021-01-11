import * as pipeable from './pipeable/index.js'
import { hasBeenInvoked } from './helpers/index.js'

export default function Itrabble(context) {
  this[Symbol.iterator] = context[Symbol.iterator].bind(this)

  Object.entries(pipeable).forEach(([ methodName, implementation ]) =>
    this[methodName] = this.buildIterator(implementation)
  )
}

Itrabble.prototype.buildIterator = function(iteratorFunc) {
  return (...args) => {
    const nextItrabble = iteratorFunc(...args)(this)

    if (hasBeenInvoked(nextItrabble)) {
      return nextItrabble
    }

    return new Itrabble(nextItrabble)
  }
}

Itrabble.prototype.pipe = function(...iteratorFuncs) {
  const pipeline = iteratorFuncs.reduce((collectedPipeline, iteratorFunc) => iteratorFunc(collectedPipeline), this)

  if (hasBeenInvoked(pipeline)) return pipeline

  return new Itrabble(pipeline)
}

  // get first() {
  //   return first()(this)
  // }

  // get last() {
  //   return last()(this)
  // }
// }
