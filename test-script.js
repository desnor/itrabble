const it = require('./dist/index')
const { map, filter, first, toArray } = require('./dist')

const timeArray = (length) => {
    console.time(`array ${length}`);
    const res = Array.from({ length }, (_, i) => i)
        .map(x =>  x ** x )
        .find(x => x % 3 === 0)
    console.timeEnd(`array ${length}`);
    return res
}

function* genList(n){
    let i = 0
    while(i <= n) {
        yield i
        i++
    }
}

const timeItrabble = (length) => {
    console.time(`itrabble ${length}`);
    const res = it(genList(length))
        .map(x => x ** x )
        .filter(x => x % 3 === 0)
        .first()
        .toArray();
    console.timeEnd(`itrabble ${length}`);
    return res
}

const timePipeItrabble = (length) => {
    console.time(`pipeable ${length}`)
    const res = it(genList(length)).pipe(
        map(x => x ** x),
        filter(x => x % 3 === 0 ),
        first(),
        toArray()
    )
    console.timeEnd(`pipeable ${length}`)
    return res
}

const n = 1000000

timeArray(n)
timeItrabble(n)
timePipeItrabble(n)
