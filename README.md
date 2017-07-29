## itrabble
# Library to extend JS iterables

# examples:

```array.itrabble.skipUntil(x => x === 'd') // d e f```

```map.itrabble.takeUntil(x => x.includes('e')) // [ 'a', 'a' ] [ 'b', 'b' ] [ 'c', 'c' ] [ 'd', 'd' ]```

```string.itrabble.takeUntil(x => x === 'i') // t e s t   s t r```

```console.log(...array.itrabble.take(3).zip(array.itrabble.first(), map.itrabble.skip(1).take(3))) // [ 'a', 'a', [ 'b', 'b' ] ] [ 'b', undefined, [ 'c', 'c' ] ] [ 'c', undefined, [ 'd', 'd' ] ]```
