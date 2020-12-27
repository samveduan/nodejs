/**
 * 操作MySql
 */

// 中间件：处理请求的，本质就是个函数

// 在 Express 中，对中间件有几种分类

// 当请求进来，会从第一个中间件开始进行匹配
//    如果匹配，则进来
//       如果请求进入中间件之后，没有调用 next 则代码会停在当前中间件
//       如果调用了 next 则继续向后找到第一个匹配的中间件
//    如果不匹配，则继续判断匹配下一个中间件
//    
// 不关心请求路径和请求方法的中间件
// 也就是说任何请求都会进入这个中间件

// 中间件本身是一个方法，该方法接收三个参数：
//    Request 请求对象
//    Response 响应对象
//    next     下一个中间件
// 当一个请求进入一个中间件之后，如果不调用 next 则会停留在当前中间件
// 所以 next 是一个方法，用来调用下一个中间件的
// 调用 next 方法也是要匹配的（不是调用紧挨着的那个）

// 有输入就要有输出，遇到输出则停止在当前中间件，即使在当前中间件的输出之前已经有next()

// 总结就是：进来后找匹配的中间件，匹配到了如果有输出则终止，没有输出（一般是异常）则可以通过调用next方法继续向后找到第一个匹配的中间件（一般是错误处理中间件）
var express = require("express")
var fs = require("fs")
var path = require("path")
var mysql = require("mysql")
var bodyParser = require("body-parser")

var app = express()

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

app.get("/", function (req, res) {
    res.render("index.html");
})

app.get("/list", function (req, res, next) {
    var dataObj = { ret: false, total: 0, rows: [], msg: "" };

    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (!error) {
            dataObj.total = results.length;
            dataObj.ret = true;
            dataObj.rows = results;
            console.log('The solution is: ', results);
            //connection.end();
            res.json(dataObj);
        } else {
            next(error);
        }
    });
})

app.post("/add", function (req, res, next) {
    var dataObj = { ret: false, msg: "" };

    connection.query(`INSERT INTO users(id, name, sex, city, age) VALUES(NULL, '${req.body.name}', '${req.body.sex}', '${req.body.city}', '${req.body.age}')`, function (error, results, fields) {
        if (!error) {
            dataObj.ret = true;
            dataObj.msg = "添加用户成功！";
            res.json(dataObj);
        } else {
            // return res.status(500).send('Server Error')
            // 当调用 next 的时候，如果传递了参数，则直接往后找到带有(四个参数的应用程序级别中间件)
            // 当发生错误的时候，我们可以调用 next 传递错误对象
            // 然后就会被全局错误处理中间件匹配到并处理之
            next(error);
        }
    });
})

app.post("/edit", function (req, res, next) {
    let dataObj = { ret: false, msg: '' };

    connection.query(`UPDATE users SET name='${req.body.name}',sex='${req.body.sex}',city='${req.body.city}',age='${req.body.age}' WHERE id='${req.body.id}'`, function (error, results, fields) {
        if (!error) {
            dataObj.ret = true;
            dataObj.msg = "更新用户成功！";
            res.json(dataObj);
        } else {
            next(error);
        }
    });
})

app.delete("/delete", function (req, res, next) {
    var dataObj = { ret: false, msg: "" };

    var idArr = JSON.parse(req.body.userIdArr);

    connection.query(`DELETE FROM users WHERE id='${idArr[0]}'`, function (error, results, fields) {
        if (!error) {
            dataObj.ret = true;
            dataObj.msg = "删除用户成功！";
            res.json(dataObj);
        } else {
            next(error);
        }
    });
})

app.get("/read", function(req, res, next){
    var dataObj = { ret: false, msg: "" };
    
    fs.readFile(path.join(__dirname + "/abc.txt"), function(error, data){
        if(!error){
            dataObj.msg = data.toString();
            res.json(dataObj);
        }else{
            next(error);
        }
    })
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

app.listen(7777, function () {
    console.log("server is running...");
})