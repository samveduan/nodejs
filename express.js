/**
 * 功能演示：
 * 1、模板引擎
 * 2、静态资源文件
 * 3、获取POST请求数据
 */

/**
 * 一、express使用
 */

// 0. 安装
// 1. 引包
var express = require("express")
var fs = require("fs")

// 2. 创建你服务器应用程序
//    也就是原来的 http.createServer
var app = express();

/**
  * 二、使用body-parser获取POST方式提交的数据
*/

// 二、使用body-parser获取POST方式提交的数据1：
var bodyParser = require("body-parser")

// 设置静态资源文件夹
// 只要这样做了，你就可以直接通过 /static/xx 的方式访问 public 目录中的所有资源了
app.use("/static/", express.static("./static/"));
app.use('/node_modules/', express.static('./node_modules/'));

/**
 * 三、art-template模板引擎：
 */

// 三、art-template模板引擎：设置模板文件类型
app.engine("html", require("express-art-template"))

// 二、使用body-parser获取POST方式提交的数据2：
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get("/", function (req, res) {
    //res.send("get请求根目录");
    res.render("index.html");
})

// 查询所有数据
app.get("/list", function (req, res) {
    var dataObj = { ret: false, total: 0, rows: [], msg: "" };

    fs.readFile("./file/obj.txt", function (error, data) {
        if (!error) {
            var dataArr = JSON.parse(data);
            dataObj.total = dataArr.length;
            dataObj.ret = true;
            dataObj.rows = dataArr;
        } else {
            dataObj.msg = "读取文件失败！";
        }

        res.json(dataObj);
    })
})

app.get("/test", function (req, res) {
    // 在 Express 中可以直接 req.query 来获取查询字符串参数
    // 获取geg请求参数
    res.send(req.query);
})

// 添加
app.get("/add", function (req, res) {
    // 在 Express 中使用模板引擎有更好的方式：res.render('文件名， {模板对象})
    // art-template 官方文档：如何让 art-template 结合 Express 来使用
    res.render("add.html", { "title": 'art-template' });
})

// 添加
app.post("/add", function (req, res) {
    var dataObj = { ret: false, msg: "" };

    var userObj = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        city: req.body.city
    }

    fs.readFile("./file/obj.txt", function (error, data) {
        if (!error) {
            var dataArr = JSON.parse(data);
            userObj.id = dataArr.length;
            dataArr.push(userObj);

            fs.writeFile("./file/obj.txt", JSON.stringify(dataArr), function (error, data) {
                if (!error) {
                    dataObj.ret = true;
                    dataObj.msg = "添加用户成功！";
                    res.json(dataObj);
                } else {
                    dataObj.ret = false;
                    dataObj.msg = "添加用户失败！";
                    res.json(dataObj);
                }
            })
        } else {
            dataObj.ret = false;
            dataObj.msg = "读取文件失败！";
            res.json(dataObj);
        }
    })
})

// 删除
app.delete("/delete", function (req, res) {
    var dataObj = { ret: false, msg: "" };

    var idArr = JSON.parse(req.body.userIdArr);

    fs.readFile("./file/obj.txt", function (error, data) {
        if (!error) {
            var userArr = JSON.parse(data);

            for (var i = 0; i < userArr.length; i++) {
                for (var n = 0; n < idArr.length; n++) {
                    if (userArr[i].id === idArr[n]) {
                        userArr.splice(i, 1);
                    }
                }
            }

            fs.writeFile("./file/obj.txt", JSON.stringify(userArr), function (error, data) {
                if (!error) {
                    dataObj.ret = true;
                    dataObj.msg = "删除用户成功！";
                    res.json(dataObj);
                } else {
                    dataObj.msg = "写入文件失败！";
                    res.json(dataObj);
                }
            })
        } else {
            dataObj.msg = "读取文件失败！";
            res.json(dataObj);
        }
    })
})

// 编辑
app.post("/edit", function (req, res) {
    let dataObj = { ret: false, msg: '' };

    let userObj = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        city: req.body.city
    }

    fs.readFile("./file/obj.txt", function (error, data) {
        if (!error) {
            var userArr = JSON.parse(data);

            for (var i = 0; i < userArr.length; i++) {
                if (userArr[i].id == userObj.id) {
                    userArr[i] = userObj;
                }
            }

            fs.writeFile("./file/obj.txt", JSON.stringify(userArr), function (error, data) {
                if (!error) {
                    dataObj.ret = true;
                    dataObj.msg = "编辑用户成功！";
                    res.json(dataObj);
                } else {
                    dataObj.msg = "写入文件失败！";
                    res.json(dataObj);
                }
            })
        } else {
            dataObj.msg = "读取文件失败！";
            res.json(dataObj);
        }
    })
})

app.get("/404", function (req, res) {
    res.render("404.html");
})

app.listen(5555, function () {
    console.log("服务启动成功......");
})