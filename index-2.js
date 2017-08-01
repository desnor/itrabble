exports.map = callback => function*(){
  for(let elm of this){
    yield callback(elm)
  }
}

exports.last = () => function*(){
  let elm
  for(elm of this){}
  yield elm
}

exports.takeUntil = callback => function*(){
  let taking = true
  for(let elm of this){
    taking = taking && !callback(elm)
    if(!taking) break
    yield elm
  }
}
exports.takeWhile = callback => function*(){
  let taking = true
  for(let elm of this){
    taking = taking && callback(elm)
    if(!taking) break
    yield elm
  }
}

exports.take = count => function*(){
  for(let elm of this){
    if(count-- === 0) break
    yield elm
  }
}

exports.skipUntil = callback => function*(){
  let skipping = true
  for(let elm of this){
    skipping = skipping && !callback(elm)
    if(!skipping)
      yield elm
  }
}

exports.skipWhile = callback => function*(){
  let skipping = true
  for(let elm of this){
    skipping = skipping && callback(elm)
    if(!skipping)
      yield elm
  }
}

exports.skip = count => function*(){
  for(let elm of this){
    if(count-- > 0) continue;
    yield elm
  }
}

exports.forEach = callback => function*(){
  let idx = 0
  for(let elm of this){
    callback(elm, idx++)
    yield elm
  }
}

exports.every = (n, offset) => function*(){
  let index = 0
  for(let elm of this){
    if(index % n === offset)
      yield elm
    index += 1
  }
}

exports.filter = callback => function*(){
  for(let elm of this){
    if(callback(elm)){
      yield elm
    }
  }
}

exports.reject = callback => function*(){
  for(let elm of this){
    if(!callback(elm)){
      yield elm
    }
  }
}

exports.reduce = (callback, memo) => function*(){
  for(let elm of this){
    memo = callback(memo, elm)
  }
  yield memo
}

exports.zip = (...its) => function*(){
  const iterators = [this[Symbol.iterator](),...its.map(it => it[Symbol.iterator]())]
  while(true){
    let next = iterators.map(it => it.next())
    if(next.every(elm => elm.done))
      break
    yield(next.map(elm => elm.value))
  }
}

const Itrabble = ctx => {
  const asIterable = ctx[Symbol.iterator] ? ctx : [ctx]
  const bindable = function(...transforms){
    return transforms.reduce((memo, transform) => {
      return Itrabble({[Symbol.iterator]: transform.bind(memo)})
    }, bindable)
  }
  bindable[Symbol.iterator] = function*(){
    for(let val of asIterable) yield val
  }
  bindable.toArray = () => [...bindable]
  return bindable
}

exports.Itrabble = Itrabble
