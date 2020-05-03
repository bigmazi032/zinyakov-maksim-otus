// выполняем запросы на сервер
// параметы скрипта
// seq - выполнять запросы последовательно. (seq=t запросы выполняются последовательно)
// repeat - количество запросов. (repeat=5)

const http = require('http')

const options = { //параметры сервера
    hostname: '127.0.0.1',
    port: 3000,
    path: '/',
    method: 'GET'
};

let args = { // по умолчанию
    repeat: 1,
    seq: 'f'
};

args = argToObject(process.argv.slice(2));

if (args.seq.toUpperCase() ==='T') {
    console.log(`выполняем запросы последовательно`);
    sendRequestSequentially(+args.repeat);
} else {
    console.log('выполняем запросы параллельно');
    sendRequestInParallel(+args.repeat);
}

function argToObject(array) {
    return array.reduce((r,e)=> {
        const a  = e.split('=');
        r[a[0]] = a[1];
        return r;
    }, args);
};

function promiseSendRequest(options){
    return new Promise((resolve, reject) => {
        const req = http.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`);
            res.on('data', d => {
                resolve(d);
            })
        });

        req.on('error', error => {
            console.error(error)
            reject(error)
        });

        req.end();
    });

}

function printResponse(data) {
    process.stdout.write(data + '\n');
}

function sendRequestInParallel(repeat) {
    for (let i=0; i<repeat; i++) {
        promiseSendRequest(options).then(printResponse);
    }
}

function sendRequestSequentially(repeat) {
    promiseSendRequest(options).then(resultHandler).catch(console.log)

    function resultHandler(result) {
        printResponse(result);
        repeat--;
        if (repeat>0) {
            sendRequestSequentially(repeat);
        }
    }
}



