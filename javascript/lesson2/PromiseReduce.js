// решение
function promiseReduce(asyncFunctions, reduce, initialValue) {
    return new Promise(resolve => {
        asyncFunctions.shift()().then(result=> {
            initialValue = reduce(result, initialValue);
            if (asyncFunctions && asyncFunctions.length > 0 ) {
                resolve(promiseReduce(asyncFunctions, reduce, initialValue))
            } else {
                resolve(initialValue)
            }
        })
    })
}
// проверка
var fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
}

var fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 3000)
})

var fn3 = () => new Promise(resolve => {
    console.log('fn3')
    setTimeout(() => resolve(2), 1000)
})

promiseReduce([fn1, fn2, fn3],function (memo, value) {
    console.log('reduce')
    return memo * value},	1).then(console.log)