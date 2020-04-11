function sum(a) {
    return function(b) {
        if (b !== undefined) {
            return sum(a+b);
        } else {
            return a;
        }
    }
}
// проверяем
console.log('sum = '+ sum(1)(2)(3)() );