module.exports = function log() {
  console.log('iterator result: ', this)
  for (const value of this){
    console.log('iterated value: ', value)
  }
}
