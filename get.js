const http = require("http");
const url = require("url");
const util = require("util");

http.createServer((req, res) => {
    const _url = req.url;
    console.log("====================");
    console.log(_url); // /user?name=%E8%8F%9C%E9%B8%9F%E6%95%99%E7%A8%8B&url=www.runoob.com
    console.log("====================");
    const params = url.parse(_url, true).query;
    console.log(util.inspect(params));

    const param1 = {
        name: 'Tom',
        day: 'Monday'
    }

    console.log(JSON.stringify(param1));
    console.log(util.inspect(param1));

    const param2 = {
        size: "large",
        get: function(){
            return this.size;
        }
    }

    console.log(typeof JSON.stringify(param2));
    console.log(typeof util.inspect(param2));

    res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
    res.end("name: " + params.name + ", url: " + params.url)
}).listen(9999, () => {
    console.log("服务启动成功！");
})