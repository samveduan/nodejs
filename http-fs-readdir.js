var http = require("http")
var fs = require("fs")

var server = http.createServer();
server.on("request", function(req, res){
    fs.readdir("G:/work/node/node1/file", function(error, dirs){
        if(!error){
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end(dirs.toString());
        }else{
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end("目录读取失败！");
        }
    })
})

server.listen(5555, function(){
    console.log("服务启动成功！");
})