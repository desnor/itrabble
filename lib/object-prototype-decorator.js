import Itrabble from './'

Object.defineProperty(Object.prototype, 'itrabble', {
  get: function(){
    return Itrabble(this)
  }
})
