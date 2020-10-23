var http = require("http")
var fs = require("fs")

var server = http.createServer();

server.on("request", function(req, res){
    var reqUrl = req.url;
    var basePath = "G:/work/node/node1/file/";
    var fileName = "index.html";

    if(reqUrl !== "/"){
        fileName = reqUrl;
    }

    console.log("请求的文件：" + basePath + fileName);

    fs.readFile(basePath + fileName, function(error, data){
        if(!error){
            res.end(data);
        }else{
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end("文件未找到！");
        }
    })
})

server.listen(5555, function(){
    console.log("服务启动成功！");
})

