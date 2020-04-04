function sum (a) {
    if (!sum.result) {
        sum.result=0;
    }

    if (a) {
        sum.result+=a;
        return sum;
    } else {
        const r = sum.result;
        sum.result = 0;
        return r;
    }
}
// проверяем
console.log('sum = '+ sum(1)(2)(3)() );