module.exports = function log() {
  for (const { value } of this){
    console.log(value)
  }
}
