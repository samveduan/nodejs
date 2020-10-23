var http = require("http")
var fs = require("fs")

var server = http.createServer();
server.on("request", function (req, res) {
    // HTTP Content-type常用对照表：https://tool.oschina.net/commons

    console.log("当前路径：" + req.url);
    
    if (req.url === '/html') {
        fs.readFile("./file/index.html", function (error, data) {
            if (!error) {
                res.setHeader("Content-Type", "text/html; charset=utf-8");
                res.end(data);
            } else {
                res.setHeader("Content-Type", "text/plain; charset=utf-8");
                res.end("读取html失败！");
            }
        })
    }else if(req.url === "/img"){
        fs.readFile("./file/sea.jpg", function (error, data) {
            if (!error) {
                res.setHeader("Content-Type", "image/jpeg");
                res.end(data);
            } else {
                res.setHeader("Content-Type", "text/plain; charset=utf-8");
                res.end("读取图片失败！");
            }
        })
    }else if(req.url === "/css"){
        fs.readFile("./file/red.css", function(error, data){
            if(!error){
                res.setHeader("Content-Type", "text/css; charset=utf-8");
                res.end(data);
            }else{
                res.setHeader("Content-Type", "text/plain; charset=utf-8");
                res.end("读取css文件失败！");
            }
        })
    }
})

server.listen(5555, function () {
    console.log("服务启动成功......");
})