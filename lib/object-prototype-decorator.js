const Itrabble = require('./')

Object.defineProperty(Object.prototype, 'itrabble', {
  get: function(){
    return Itrabble(this)
  }
})
