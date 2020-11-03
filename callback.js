function getPromise(){
    return new Promise(function (resolve, reject) {
        var num = Math.random() * 100 + 60;
    
        setTimeout(function () {
            if (num > 100) {
                resolve("num大于100：" + num);
            } else {
                reject("num小于100：" + num);
            }
        }, 1000 * 3)
    })
}

function getPromise2(){
    return new Promise(function(resolve, reject){
        var num = Math.random();
        console.log(num)
        setTimeout(function(){
            if(num>0.5){
                resolve("getPromise2执行正确。");
            }else{
                reject("getPromise2执行错误。");
            }
        }, 1000)
    })
}

getPromise().then(function (data) {
    console.log(data);
    return getPromise2();
})
.then(function(data){
    console.log(data);
})
.catch(function (data) {
    console.log("执行出错：");
    console.log(data);
})