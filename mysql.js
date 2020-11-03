/**
 * 操作MySql
 */
var express = require("express")
var fs = require("fs")
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

app.get("/list", function (req, res) {
    var dataObj = { ret: false, total: 0, rows: [], msg: "" };

    connection.query('SELECT * FROM `users`', function (error, results, fields) {
        if(!error){
            dataObj.total = results.length;
            dataObj.ret = true;
            dataObj.rows = results;
            console.log('The solution is: ', results);
            //connection.end();
        }else{
            dataObj.msg = "获取文件失败！";
        }

        res.json(dataObj);
    });
})

app.post("/add", function (req, res) {
    var dataObj = { ret: false, msg: "" };

    connection.query("INSERT INTO users(id, name, sex, city, age) VALUES(NULL, '" + req.body.name + "','" +  req.body.sex + "','" + req.body.city + "','" + req.body.age + "')", function (error, results, fields) {
        if(!error){
            dataObj.ret = true;
            dataObj.msg = "添加用户成功！";
        }else{
            dataObj.msg = "添加用户失败！";
        }

        res.json(dataObj);
    });
})

app.post("/edit", function (req, res) {
    let dataObj = { ret: false, msg: '' };

    connection.query("UPDATE users SET name='" + req.body.name + "',sex='" + req.body.sex + "',city='" + req.body.city + "',age='" + req.body.age + "'WHERE id='" + req.body.id + "'", function (error, results, fields) {
        if(!error){
            dataObj.ret = true;
            dataObj.msg = "更新用户成功！";
        }else{
            dataObj.msg = "更新用户失败！";
        }

        res.json(dataObj);
    });
})

app.delete("/delete", function (req, res) {
    var dataObj = { ret: false, msg: "" };

    var idArr = JSON.parse(req.body.userIdArr);

    connection.query("DELETE FROM users WHERE id='" + idArr[0] + "'", function (error, results, fields) {
        if(!error){
            dataObj.ret = true;
            dataObj.msg = "删除用户成功！";
        }else{
            dataObj.msg = "删除用户失败！";
        }

        res.json(dataObj);
    });
})

app.listen(7777, function () {
    console.log("server is running...");
})