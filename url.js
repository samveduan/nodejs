var http = require('http')
var url = require('url')

http.createServer(function(req, res){
    var parseObj = url.parse(req.url, true)
    console.log(parseObj)
}).listen(7777, function(){
    console.log("服务启动中......")
})

