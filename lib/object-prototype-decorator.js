import { from } from './'

Object.defineProperty(Object.prototype, 'itrabble', {
  get() {
    return from(this)
  }
})
