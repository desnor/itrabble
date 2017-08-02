# itrabble

[![Coverage Status](https://coveralls.io/repos/github/desnor/itrabble/badge.svg?branch=master)](https://coveralls.io/github/desnor/itrabble?branch=master)
[![Build Status](https://travis-ci.org/desnor/itrabble.svg?branch=master)](https://travis-ci.org/desnor/itrabble)

[![NPM](https://nodei.co/npm/itrabble.png)](https://npmjs.org/package/itrabble)

## Library to extend JavaScript ES6 iterables

### Why?

I know there are lots of other libraries that already do this kind of thing, and do it very well, extending ordinary JavaScript objects to be able to enjoy the breadth of functionality of say, a Ruby standard library object. For example [Lodash](https://lodash.com/).

The twist that interested me was to be able to incorporate the recent additions to the JavaScript language that make it possible to iterate through infinite sequences, evaluated lazily, with a handy range of methods.

Whether that be standard objects like Arrays, Maps, Sets, Strings or TypedArrays (which I don't yet have a good grasp on). So whether it's data you know, or never-ending streams of unknown riches, let it be a part of the 'rabble.

### Requirements

For a Node environment, you'll need a node version of at least 6.11.1 because this library uses iterators, generator functions and rest/spread operators amongst other new fangled things.

For browser usage, you may need to use a transpiler like Babel depending on exactly which browser and version you are targeting. My version of Chrome at the time of publishing version 1.0.0 is 60, and it all works!

### Usage

install with [npm](https://www.npmjs.com/):

`npm install --save itrabble`

### Examples

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

I'd like to provide a way to expose the individual methods as named exports which can be imported on a per-use basis, rather than importing the whole bunch and merging them all into the Object namespace. For example with the (somewhat) proposed bind operator `::`

```js
import { take } from 'itrabble/take'

const array = ['a','b','c']
const firstLetter = array::take(2)
// => a b
```

I also plan build up the range of utility functions as I think of them.

### Contributing

This project is open to contributions, and pull requests are most welcome. I've just scrambled it together so far so please open an issue to point out anything broken, lacking or otherwise worth mentioning.

fork and clone the repo

Given the minimum version of Node of `6.11.1` there's not a lot to set up.

to run tests in watch mode
`npm run test:watch`

or for a coverage report
`npm test`

### Related

You might find these related libraries interesting

[Lodash](https://lodash.com)


### License

MIT © [Alex Revell](https://github.com/desnor)
