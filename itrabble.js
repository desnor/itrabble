/* eslint-disable no-constant-condition */

function Itrabble(context){
  if(!this || this.constructor !== Itrabble) return new Itrabble(context)
  this.context = context
  this[Symbol.iterator] = function*(){
    for(let val of context) yield val
  }
}
Object.defineProperty(Object.prototype, 'itrabble', {
  get: function(){
    return Itrabble(this)
  }
})

Itrabble.prototype.toArray = function(){
  return Array.from(this)
}

Itrabble.prototype.toMap = function(){
  return new Map(this)
}

Itrabble.prototype.buildIterator = function(iteratorFunc){
  return new Itrabble({[Symbol.iterator]: iteratorFunc.bind(this) })
}

Itrabble.prototype.first = function(){
  return this.buildIterator(function*(){
    for(const elm of this.take(1)){
      yield elm
    }
  })
}

Itrabble.prototype.last = function(){
  return this.buildIterator(function*(){
    let elm;
    for(elm of this.context){}
    yield elm
  })
}

Itrabble.prototype.takeUntil = function(callback){
  return this.buildIterator(function*(){
    let taking = true
    for(let elm of this.context){
      taking = taking && !callback(elm)
      if(!taking) break
      yield elm
    }
  })
}

Itrabble.prototype.takeWhile = function(callback){
  return this.buildIterator(function*(){
    let taking = true
    for(let elm of this.context){
      taking = taking && callback(elm)
      if(!taking) break
      yield elm
    }
  })
}

Itrabble.prototype.take = function(count){
  return this.buildIterator(function*(){
    for(let elm of this.context){
      if(count-- == 0) break
      yield elm
    }
  })
}

Itrabble.prototype.skipUntil = function(callback){
  return this.buildIterator(function*(){
    let skipping = true
    for(let elm of this.context){
      skipping = skipping && !callback(elm)
      if(!skipping)
        yield elm
    }
  })
}

Itrabble.prototype.skipWhile = function(callback){
  return this.buildIterator(function*(){
    let skipping = true
    for(let elm of this.context){
      skipping = skipping && callback(elm)
      if(!skipping)
        yield elm
    }
  })
}

Itrabble.prototype.skip = function(count){
  return this.buildIterator(function*(){
    for(let elm of this.context){
      if(count-- > 0) continue;
      yield elm
    }
  })
}

Itrabble.prototype.forEach = function(callback) {
  return this.buildIterator(function*(){
    for(let elm of this.context){
      callback(elm)
      yield elm
    }
  })
}

Itrabble.prototype.every = function(n, offset=0) {
  return this.buildIterator(function*(){
    let index = 0
    for(let elm of this.context){
      if(index % n == offset)
        yield elm
      index += 1
    }
  })
}

Itrabble.prototype.map = function(callback) {
  return this.buildIterator(function*(){
    for(let elm of this.context){
      yield callback(elm)
    }
  })
}

Itrabble.prototype.filter = function(callback) {
  return this.buildIterator(function*(){
    for(let elm of this.context){
      if(callback(elm)){
        yield elm
      }
    }
  })
}

Itrabble.prototype.reject = function(callback) {
  return this.buildIterator(function*(){
    for(let elm of this.context){
      if(!callback(elm)){
        yield elm
      }
    }
  })
}

Itrabble.prototype.reduce = function(memo, callback){
  return this.buildIterator(function*(){
    for(let elm of this.context){
      memo = callback(memo, elm)
    }
    yield memo
  })
}

Itrabble.prototype.zip = function(...its){
  return this.buildIterator(function*(){
    const iterators = [this[Symbol.iterator](),...its.map(it => it[Symbol.iterator]())]
    while(true){
      let next = iterators.map(it => it.next())
      if(next.every(elm => elm.done))
        break
      yield(next.map(elm => elm.value))
    }
  })
}

module.exports = Itrabble
