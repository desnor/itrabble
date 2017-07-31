# itrabble

[![Coverage Status](https://coveralls.io/repos/github/desnor/itrabble/badge.svg?branch=master)](https://coveralls.io/github/desnor/itrabble?branch=master)
[![Build Status](https://travis-ci.org/desnor/itrabble.svg?branch=master)](https://travis-ci.org/desnor/itrabble)

## Library to extend JavaScript iterables

### Usage

```js
// define some iterables
const array = ['a','b','c','d','e','f']

const map = new Map([['a', 'a'],['b', 'b'], ['c', 'c'],['d','d'],['e','e'],['f','f']])

const string = 'test string'
```
There are currently two ways to use the library.

The first is simply to import the module and call the `itrabble` property on any entity that has `Object` in its prototype and which has a `Symbol.iterator` property and you'll have access to the itrabble family of methods.

##### Example 1
```js
require('itrabble')

/* Array */
array.itrabble.skipUntil(x => x === 'd')
//  => d e f

/* Map */
map.itrabble.takeUntil(x => x.includes('e'))
//  => [ 'a', 'a' ] [ 'b', 'b' ] [ 'c', 'c' ] [ 'd', 'd' ]

/* String */
string.itrabble.takeUntil(x => x === 'i')
//  => 'test str'

// All together now
array.itrabble.zip( array, map, string ).take(3)
// => [ 'a', 'a', [ 'a', 'a' ], 't' ] [ 'b', 'b', [ 'b', 'b' ], 'e' ] [ 'c', 'c', [ 'c', 'c' ], 's' ]
```

Alternatively use the imported module as a function to wrap the iterable object you wish to extend:
##### Example 2
```js
const itrabble = require('itrabble')

itrabble(array).skipUntil(x => x === 'd')
//  => d e f
```

Currently whichever way you use it the Object namespace `itrabble` is created to return an itrabble. I'm looking to update this (see [more to come](#more-to-come) below).

The methods all return an instance of itrabble, which means they can be chained.

```js
array.itrabble.skipUntil(x => x === 'd').first()
//  => d
```

The output is an iterator, so in order to consume the actual values either use one of the standard ES6 calls:

```js
const skipped = array.itrabble.skipUntil(x => x === 'd')

console.log(...skipped)
//  => d e f

for (let value of skipped){
  console.log(value)
}
//  => d e f
```

or alternatively specify the format with the following methods:

```js
/* Array */
array.itrabble.skipUntil(x => x === 'd').toArray()
// => ['d','e','f']

/* Map */
map.itrabble.takeUntil(x => x.includes('e')).toMap()
// => Map { 'a' => 'a', 'b' => 'b', 'c' => 'c', 'd' => 'd' }
```

Thanks to [@wouterken](https://github.com/wouterken) for the interest and help with this!

### More to come

* I'd like to provide a way to expose the individual methods as named exports which can be imported on a per-use basis, rather than importing the whole bunch and merging them all into the Object namespace. For example with the (somewhat) proposed bind operator `::`

```js
import { take } from 'itrabble/take'

const array = ['a','b','c']
const firstLetter = array::take(2)
// => a b
```
