/**
 * Filter items from the iterable collection on which it is called that
 * return true from the predicate callback.
 *
 * @generator filter
 * @param {function} predicateFn - returns true or false.
 * @yields {*} - the next filtered item from collection.
**/
function *filter(predicateFn){
  for (let elm of this) {
    if (predicateFn(elm)) {
      yield elm
    }
  }
}

module.exports = filter
