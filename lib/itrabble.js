import * as pipeable from './pipeable/index.js'
import { hasBeenInvoked } from './helpers/index.js'

export default class Itrabble {
  constructor(context){
    this[Symbol.iterator] = context[Symbol.iterator].bind(context)

    Object.entries(pipeable).forEach(([ methodName, implementation ]) =>
      this[methodName] = this.buildIterator(implementation)
    )
  }

  buildIterator(iteratorFunc) {
    return (...args) => {
      const nextItrabble = iteratorFunc(...args)(this)

      if (hasBeenInvoked(nextItrabble)) {
        return nextItrabble
      }

      return new Itrabble(nextItrabble)
    }
  }

  pipe(...iteratorFuncs) {
    const pipeline = iteratorFuncs.reduce((collectedPipeline, iteratorFunc) => iteratorFunc(collectedPipeline), this)

    if (hasBeenInvoked(pipeline)) return pipeline

    return new Itrabble(pipeline)
  }
}
