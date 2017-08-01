/* eslint-disable no-constant-condition */
/* eslint-disable no-empty */

// function Itrabble(context){
//   if(!this || this.constructor !== Itrabble) return new Itrabble(context)
//   this.context = context
//   this[Symbol.iterator] = function*(){
//     for(let val of context) yield val
//   }
// }
//
Object.defineProperty(Object.prototype, 'itrabble', {
  get: function(){
    return Itrabble(this)
  }
})

function toArray(){
  return Array.from(this)
}

// Itrabble.prototype.toArray = function(){
//   return Array.from(this)
// }

function toMap(formatter = formatMap){
  const formatted = formatter(...this)
  return formatted
}

function formatMap(...entries) {
  try {
    return new Map(entries)
  }
  catch(e){
    const firsts = Itrabble(entries)(seq(2))
    const seconds = Itrabble(entries)(skip(1))(seq(2))


    return new Map(firsts(zip(seconds)))
  }

}

// Itrabble.prototype.toMap = function(){
//   return new Map(this)
// }

// Itrabble.prototype.buildIterator = function(iteratorFunc){
//   return new Itrabble({
//     [Symbol.iterator]: iteratorFunc.bind(this)
//   })
// }

function *first() {
  for (const elm of this) {
    yield elm
    break
  }
}

exports.first = first

// Itrabble.prototype.first = getFirst
//
// Itrabble.prototype.first = function(){
//   return this.buildIterator(function*(){
//     for(const elm of this.context){
//       yield elm
//       break
//     }
//   })
// }

function last() {
  return function*(){
    let elm
    for (elm of this) {}
    yield elm
  }
}

exports.last = last

// Itrabble.prototype.last = function(){
//   return this.buildIterator(function*(){
//     let elm
//     for(elm of this.context){}
//     yield elm
//   })
// }

function takeUntil(callback) {
  return function*(){
    let taking = true
    for (let elm of this) {
      taking = taking && !callback(elm)
      if (!taking) break
      yield elm
    }
  }
}

exports.takeUntil = takeUntil

// Itrabble.prototype.takeUntil = function(callback){
//   return this.buildIterator(function*(){
//     let taking = true
//     for(let elm of this.context){
//       taking = taking && !callback(elm)
//       if(!taking) break
//       yield elm
//     }
//   })
// }

function takeWhile(callback) {
  return function*(){
    let taking = true
    for (let elm of this) {
      taking = taking && callback(elm)
      if (!taking) break
      yield elm
    }
  }
}

exports.takeWhile = takeWhile

// Itrabble.prototype.takeWhile = function(callback){
//   return this.buildIterator(function*(){
//     let taking = true
//     for(let elm of this.context){
//       taking = taking && callback(elm)
//       if(!taking) break
//       yield elm
//     }
//   })
// }

function take(count) {
  return function*(){
    for (let elm of this) {
      if (count-- === 0) break
      yield elm
    }
  }
}

exports.take = take

// Itrabble.prototype.take = function(count, offset=0){
//   return this.buildIterator(function*(){
//     let index = 0
//     for(let elm of this.context){
//       if(index++ < offset) continue
//       if(count-- == 0) break
//       yield elm
//     }
//   })
// }

function skipUntil(callback) {
  return function*() {
    let skipping = true
    for (let elm of this) {
      skipping = skipping && !callback(elm)
      if (!skipping) yield elm
    }
  }
}

exports.skipUntil = skipUntil

// Itrabble.prototype.skipUntil = function(callback){
//   return this.buildIterator(function*(){
//     let skipping = true
//     for(let elm of this.context){
//       skipping = skipping && !callback(elm)
//       if(!skipping)
//         yield elm
//     }
//   })
// }

function skipWhile(callback) {
  return function*(){
    let skipping = true
    for (let elm of this) {
      skipping = skipping && callback(elm)
      if (!skipping) yield elm
    }
  }
}

exports.skipWhile = skipWhile

// Itrabble.prototype.skipWhile = function(callback){
//   return this.buildIterator(function*(){
//     let skipping = true
//     for(let elm of this.context){
//       skipping = skipping && callback(elm)
//       if(!skipping)
//         yield elm
//     }
//   })
// }

function skip(count) {
  return function*(){
    for (let elm of this) {
      if (count-- > 0) continue
      yield elm
    }
  }
}

exports.skip = skip

// Itrabble.prototype.skip = function(count){
//   return this.buildIterator(function*(){
//     for(let elm of this.context){
//       if(count-- > 0) continue
//       yield elm
//     }
//   })
// }

function forEach(callback) {
  return function*(){
    let idx = 0
    for (let elm of this) {
      callback(elm, idx++)
      yield elm
    }
  }
}

exports.forEach = forEach

// Itrabble.prototype.forEach = function(callback) {
//   return this.buildIterator(function*(){
//     for(let elm of this.context){
//       callback(elm)
//       yield elm
//     }
//   })
// }

function seq(n, offset=0) {
  return function*(){
    let index = 0
    for (let elm of this) {
      if (index % n === offset) yield elm
      index += 1
    }
  }
}

exports.seq = seq

// Itrabble.prototype.seq = function(n, offset=0) {
//   return this.buildIterator(function*(){
//     let index = 0
//     for(let elm of this.context){
//       if(index % n == offset) yield elm
//       index += 1
//     }
//   })
// }

// function map(callback) {
//   return function*() {
//     for (let elm of this) {
//       yield callback(elm)
//     }
//   }
// }

exports.map = map

//
// Itrabble.prototype.map = function(callback) {
//   return this.buildIterator(function*(){
//     for(let elm of this.context){
//       yield callback(elm)
//     }
//   })
// }

// Itrabble.prototype.filter = function(callback) {
//   return this.buildIterator(function*(){
//     for(let elm of this.context){
//       if(callback(elm)){
//         yield elm
//       }
//     }
//   })
// }

function reject(callback) {
  return function*(){
    for (let elm of this) {
      if (!callback(elm)) {
        yield elm
      }
    }
  }
}

exports.reject = reject

// Itrabble.prototype.reject = function(callback) {
//   return this.buildIterator(function*(){
//     for(let elm of this.context){
//       if(!callback(elm)){
//         yield elm
//       }
//     }
//   })
// }

function reduce(callback, memo) {
  return function*(){
    for (let elm of this) {
      memo = callback(memo, elm)
    }
    yield memo
  }
}

exports.reduce = reduce

// Itrabble.prototype.reduce = function(callback, memo){
//   return this.buildIterator(function*(){
//     for(let elm of this.context){
//       memo = callback(memo, elm)
//     }
//     yield memo
//   })
// }

function zip(...its) {
  return function*(){
    const iterators = [
      this[Symbol.iterator](),
      ...its.map(it => it[Symbol.iterator]())
    ]
    while (true) {
      let next = iterators.map(it => it.next())
      if(next.every(elm => elm.done)) break
      yield(next.map(elm => elm.value))
    }
  }
}

exports.zip = zip

// Itrabble.prototype.zip = function(...its){
//   return this.buildIterator(function*(){
//     const iterators = [this[Symbol.iterator](),...its.map(it => it[Symbol.iterator]())]
//     while(true){
//       let next = iterators.map(it => it.next())
//       if(next.every(elm => elm.done))
//         break
//       yield(next.map(elm => elm.value))
//     }
//   })
// }

function zipWith(callback, ...its) {
  return function*(){
    const iterators = [
      this[Symbol.iterator](),
      ...its.map(it => it[Symbol.iterator]())
    ]
    while (true) {
      let next = iterators.map(it => it.next())
      if (next.every(elm => elm.done)) break
      yield(callback(...next.map(elm => elm.value)))
    }
  }
}

exports.zipWith = zipWith

// Itrabble.prototype.zipWith = function(callback, ...its){
//   return this.buildIterator(function*(){
//     const iterators = [this[Symbol.iterator](), ...its.map(it => it[Symbol.iterator]())]
//     while(true){
//       let next = iterators.map(it => it.next())
//       if(next.every(elm => elm.done))
//         break
//       yield(callback(...next.map(elm => elm.value)))
//     }
//   })
// }
const setMethod = buildFn => method => (...args) => buildFn(method(...args))



function *filter(callback){
  for (let elm of this) {
    if (callback(elm)) {
      yield elm
    }
  }
}

function *map(callback) {
  for (let elm of this) {
    yield callback(elm)
  }
}

exports.filter = filter


function Itrabble(context){
  if(!this || this.constructor !== Itrabble) return new Itrabble(context)
  this[Symbol.iterator] = context[Symbol.iterator].bind(context)
  this.addEnumerables({filter, map})
}

Itrabble.prototype.addEnumerables = function(enumerables){
  Object.entries(enumerables).forEach(([name, implementation]) => {
    this[name] = this.buildIterator(implementation)
  })
}

Itrabble.prototype.buildIterator = function(iteratorFunc){
  return (...args) =>  new Itrabble({
    [Symbol.iterator]: iteratorFunc.bind(this, ...args)
  })
}

Itrabble([1,2,3]).filter(x => x % 2 == 0)
//
// exports.filter = function*(callback){
//   for(let elm of this.context){
//     if(callback(elm)){
//       yield elm
//     }
//   }
// }
//
// exports.map = function*(callback){
//   for(let elm of this.context){
//     yield callback(elm)
//   }
// }



//
// function Itrabble(ctx) {
//   const asIterable = ctx[Symbol.iterator] ? ctx : [ ctx ]
//
//   const itrabble = function(...transforms){
//     return transforms.reduce((memo, transform) => {
//       return Itrabble({ [Symbol.iterator]: transform.bind(memo) })
//     }, itrabble)
//   }
//
//   itrabble[Symbol.iterator] = function*(){
//     for (let val of asIterable) yield val
//   }
//
//   itrabble.toArray = toArray
//   itrabble.toMap = toMap
//   itrabble.first = itrabble.bind(first)
//
//   return itrabble
// }

exports.Itrabble = Itrabble
