function *filter(callback){
  for (let elm of this) {
    if (callback(elm)) {
      yield elm
    }
  }
}

module.exports = filter
