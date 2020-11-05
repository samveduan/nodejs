var express = require("express")
var mysql = require("mysql")
var bodyParser = require("body-parser")

var app = express();

app.use("/static/", express.static("./static/"))

app.engine("html", require("express-art-template"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'blog'
});

connection.connect();

app.get("/", function(req, res){
    res.render("index.html");
})

app.get("/list", function(req, res){
    var dataObj = { ret: false, total: 0, rows: [], msg: "" };

    connection.query('SELECT * FROM `users`', function (error, results, fields) {
        if(!error){
            dataObj.total = results.length;
            dataObj.ret = true;
            dataObj.rows = results;
            //connection.end();
        }else{
            dataObj.msg = "获取文件失败！";
        }

        res.json(dataObj);
    });
})

// 配置一个处理 404 的中间件
app.use(function (req, res) {
    res.render('404.html')
})

// 配置一个全局错误处理中间件
app.use(function (err, req, res, next) {
    res.status(500).json({
      err_code: 500,
      message: err.message
    })
})

app.listen(7777, function(){
    console.log("server is running......");
})