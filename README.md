# itrabble

[![Coverage Status](https://coveralls.io/repos/github/desnor/itrabble/badge.svg?branch=master)](https://coveralls.io/github/desnor/itrabble?branch=master)
[![Build Status](https://travis-ci.org/desnor/itrabble.svg?branch=master)](https://travis-ci.org/desnor/itrabble)

## Library to extend JS iterables

### Examples:

```js
// define some iterables

const array = ['a','b','c','d','e','f']

const map = new Map([['a', 'a'],['b', 'b'], ['c', 'c'],['d','d'],['e','e'],['f','f']])

const string = 'test string'
```

Simply call the `itrabble` property on any entity that has `Object` in its prototype and which has a `Symbol.iterator` property and you'll have access to the itrabble family of methods.

Example usage:
```js
require('itrabble')


// Array
array.itrabble.skipUntil(x => x === 'd')
//  => d e f

// Map
map.itrabble.takeUntil(x => x.includes('e'))
//  => [ 'a', 'a' ] [ 'b', 'b' ] [ 'c', 'c' ] [ 'd', 'd' ]

// String
string.itrabble.takeUntil(x => x === 'i')
//  => 'test str'

// All three together
array.itrabble.zip( array, map, string ).take(3)
// => [ 'a', 'a', [ 'a', 'a' ], 't' ] [ 'b', 'b', [ 'b', 'b' ], 'e' ] [ 'c', 'c', [ 'c', 'c' ], 's' ]
```

The format of the end result can be specified with the following methods:

```js
/*  .toArray() => Array */

array.itrabble.skipUntil(x => x === 'd').toArray()
// => ['d','e','f']

/*  .toMap() => Map */

map.itrabble.takeUntil(x => x.includes('e')).toMap()
// => Map { 'a' => 'a', 'b' => 'b', 'c' => 'c', 'd' => 'd' }

```

Thanks to [@wouterken](https://github.com/wouterken) for the interest and help with this!

...more to come
